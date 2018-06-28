/*!
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const common = require('@google-cloud/common-grpc');
const is = require('is');
const snakeCase = require('lodash.snakecase');

const Cluster = require('./cluster');

/**
 * Create an app profile object to interact with your app profile.
 *
 * @class
 * @param {Instance} instance The parent instance of this app profile.
 * @param {string} name Name of the app profile.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const appProfile = instance.appProfile('my-app-profile');
 */
class AppProfile {
  constructor(instance, id) {
    this.bigtable = instance.bigtable;
    this.instance = instance;

    var name;

    if (id.includes('/')) {
      if (id.startsWith(`${instance.name}/appProfiles/`)) {
        name = id;
      } else {
        throw new Error(
          `AppProfile id '${id}' is not formatted correctly.
Please use the format 'my-app-profile' or '${
            instance.name
          }/appProfiles/my-app-profile'.`
        );
      }
    } else {
      name = `${instance.name}/appProfiles/${id}`;
    }

    this.id = name.split('/').pop();
    this.name = name;
  }

  /**
   * Formats a app profile options object into proto format.
   *
   * @private
   *
   * @param {object} options The options object.
   * @returns {object}
   *
   * @example
   * // Any cluster routing:
   * Family.formatAppProfile_({
   *   routing: 'any',
   *   description: 'My App Profile',
   * });
   * // {
   * //   multiClusterRoutingUseAny: {},
   * //   description: 'My App Profile',
   * // }
   *
   * // Single cluster routing:
   * const cluster = myInstance.cluster('my-cluster');
   * Family.formatAppProfile_({
   *   routing: cluster,
   *   allowTransactionalWrites: true,
   *   description: 'My App Profile',
   * });
   * // {
   * //   singleClusterRouting: {
   * //     clusterId: 'my-cluster',
   * //     allowTransactionalWrites: true,
   * //   },
   * //   description: 'My App Profile',
   * // }
   */
  static formatAppProfile_(options) {
    const appProfile = {};

    if (options.routing) {
      if (options.routing === 'any') {
        appProfile.multiClusterRoutingUseAny = {};
      } else if (options.routing instanceof Cluster) {
        appProfile.singleClusterRouting = {
          clusterId: options.routing.id,
        };
        if (is.boolean(options.allowTransactionalWrites)) {
          appProfile.singleClusterRouting.allowTransactionalWrites =
            options.allowTransactionalWrites;
        }
      } else {
        throw new Error(
          'An app profile routing policy can only contain "any" or a `Cluster`.'
        );
      }
    }

    if (is.string(options.description)) {
      appProfile.description = options.description;
    }

    return appProfile;
  }

  /**
   * Create an app profile.
   *
   * @param {object} [options] See {@link Instance#createAppProfile}.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const appProfile = instance.appProfile('my-appProfile');
   *
   * appProfile.create(function(err, appProfile, apiResponse) {
   *   if (!err) {
   *     // The app profile was created successfully.
   *   }
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * appProfile.create().then(function(data) {
   *   const appProfile = data[0];
   *   const apiResponse = data[1];
   * });
   */
  create(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }
    this.instance.createAppProfile(this.id, options, callback);
  }
  /**
   * Delete the app profile.
   *
   * @param {object} [options] Cluster creation options.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {boolean} [options.ignoreWarnings] Whether to ignore safety checks
   *     when deleting the app profile.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * appProfile.delete(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * appProfile.delete().then(function(data) {
   *   var apiResponse = data[0];
   * });
   */
  delete(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    const reqOpts = {
      name: this.name,
    };

    if (is.boolean(options.ignoreWarnings)) {
      reqOpts.ignoreWarnings = options.ignoreWarnings;
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'deleteAppProfile',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      callback
    );
  }

  /**
   * Check if an app profile exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {boolean} callback.exists Whether the app profile exists or not.
   *
   * @example
   * appProfile.exists(function(err, exists) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * appProfile.exists().then(function(data) {
   *   var exists = data[0];
   * });
   */
  exists(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, err => {
      if (err) {
        if (err.code === 5) {
          callback(null, false);
          return;
        }

        callback(err);
        return;
      }

      callback(null, true);
    });
  }

  /**
   * Get a appProfile if it exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   *
   * @example
   * appProfile.get(function(err, appProfile, apiResponse) {
   *   // The `appProfile` data has been populated.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * appProfile.get().then(function(data) {
   *   var appProfile = data[0];
   *   var apiResponse = data[1];
   * });
   */
  get(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, (err, metadata) => {
      callback(err, err ? null : this, metadata);
    });
  }

  /**
   * Get the app profile metadata.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The metadata.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * appProfile.getMetadata(function(err, metadata, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * appProfile.getMetadata().then(function(data) {
   *   var metadata = data[0];
   *   var apiResponse = data[1];
   * });
   */
  getMetadata(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'getAppProfile',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          this.metadata = args[1];
        }

        callback(...args);
      }
    );
  }

  /**
   * Set the app profile metadata.
   *
   * @param {object} metadata See {@link Instance#createAppProfile} for the
   *     available metadata options.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const cluster = instance.cluster('my-cluster');
   * const appProfile = instance.appProfile('my-appProfile');
   *
   * const metadata = {
   *   description: 'My Updated App Profile',
   *   routing: cluster,
   *   allowTransactionalWrites: true,
   * };
   *
   * appProfile.setMetadata(metadata, callback);
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * appProfile.setMetadata(metadata).then(function(data) {
   *   const apiResponse = data[0];
   * });
   */
  setMetadata(metadata, gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const reqOpts = {
      appProfile: AppProfile.formatAppProfile_(metadata),
      updateMask: {
        paths: [],
      },
    };
    reqOpts.appProfile.name = this.name;

    const fieldsForMask = [
      'description',
      'singleClusterRouting',
      'multiClusterRoutingUseAny',
      'allowTransactionalWrites',
    ];

    fieldsForMask.forEach(field => {
      if (reqOpts.appProfile[field]) {
        reqOpts.updateMask.paths.push(snakeCase(field));
      }
    });

    if (is.boolean(metadata.ignoreWarnings)) {
      reqOpts.ignoreWarnings = metadata.ignoreWarnings;
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'updateAppProfile',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      callback
    );
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(AppProfile);

/**
 * Reference to the {@link AppProfile} class.
 * @name module:@google-cloud/bigtable.AppProfile
 * @see AppProfile
 */
module.exports = AppProfile;
