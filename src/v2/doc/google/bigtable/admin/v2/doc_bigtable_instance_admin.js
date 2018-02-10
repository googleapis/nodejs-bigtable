// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * Request message for BigtableInstanceAdmin.CreateInstance.
 *
 * @property {string} parent
 *   The unique name of the project in which to create the new instance.
 *   Values are of the form `projects/<project>`.
 *
 * @property {string} instanceId
 *   The ID to be used when referring to the new instance within its project,
 *   e.g., just `myinstance` rather than
 *   `projects/myproject/instances/myinstance`.
 *
 * @property {Object} instance
 *   The instance to create.
 *   Fields marked `OutputOnly` must be left blank.
 *
 *   This object should have the same structure as [Instance]{@link google.bigtable.admin.v2.Instance}
 *
 * @property {Object.<string, Object>} clusters
 *   The clusters to be created within the instance, mapped by desired
 *   cluster ID, e.g., just `mycluster` rather than
 *   `projects/myproject/instances/myinstance/clusters/mycluster`.
 *   Fields marked `OutputOnly` must be left blank.
 *   Currently exactly one cluster must be specified.
 *
 * @typedef CreateInstanceRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateInstanceRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var CreateInstanceRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.GetInstance.
 *
 * @property {string} name
 *   The unique name of the requested instance. Values are of the form
 *   `projects/<project>/instances/<instance>`.
 *
 * @typedef GetInstanceRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GetInstanceRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var GetInstanceRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.ListInstances.
 *
 * @property {string} parent
 *   The unique name of the project for which a list of instances is requested.
 *   Values are of the form `projects/<project>`.
 *
 * @property {string} pageToken
 *   The value of `next_page_token` returned by a previous call.
 *
 * @typedef ListInstancesRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListInstancesRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var ListInstancesRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for BigtableInstanceAdmin.ListInstances.
 *
 * @property {Object[]} instances
 *   The list of requested instances.
 *
 *   This object should have the same structure as [Instance]{@link google.bigtable.admin.v2.Instance}
 *
 * @property {string[]} failedLocations
 *   Locations from which Instance information could not be retrieved,
 *   due to an outage or some other transient condition.
 *   Instances whose Clusters are all in one of the failed locations
 *   may be missing from `instances`, and Instances with at least one
 *   Cluster in a failed location may only have partial information returned.
 *
 * @property {string} nextPageToken
 *   Set if not all instances could be returned in a single response.
 *   Pass this value to `page_token` in another request to get the next
 *   page of results.
 *
 * @typedef ListInstancesResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListInstancesResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var ListInstancesResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.PartialUpdateInstance.
 *
 * @property {Object} instance
 *   The Instance which will (partially) replace the current value.
 *
 *   This object should have the same structure as [Instance]{@link google.bigtable.admin.v2.Instance}
 *
 * @property {Object} updateMask
 *   The subset of Instance fields which should be replaced.
 *   Must be explicitly set.
 *
 *   This object should have the same structure as [FieldMask]{@link google.protobuf.FieldMask}
 *
 * @typedef PartialUpdateInstanceRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.PartialUpdateInstanceRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var PartialUpdateInstanceRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.DeleteInstance.
 *
 * @property {string} name
 *   The unique name of the instance to be deleted.
 *   Values are of the form `projects/<project>/instances/<instance>`.
 *
 * @typedef DeleteInstanceRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.DeleteInstanceRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var DeleteInstanceRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.CreateCluster.
 *
 * @property {string} parent
 *   The unique name of the instance in which to create the new cluster.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>`.
 *
 * @property {string} clusterId
 *   The ID to be used when referring to the new cluster within its instance,
 *   e.g., just `mycluster` rather than
 *   `projects/myproject/instances/myinstance/clusters/mycluster`.
 *
 * @property {Object} cluster
 *   The cluster to be created.
 *   Fields marked `OutputOnly` must be left blank.
 *
 *   This object should have the same structure as [Cluster]{@link google.bigtable.admin.v2.Cluster}
 *
 * @typedef CreateClusterRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateClusterRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var CreateClusterRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.GetCluster.
 *
 * @property {string} name
 *   The unique name of the requested cluster. Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
 *
 * @typedef GetClusterRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GetClusterRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var GetClusterRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.ListClusters.
 *
 * @property {string} parent
 *   The unique name of the instance for which a list of clusters is requested.
 *   Values are of the form `projects/<project>/instances/<instance>`.
 *   Use `<instance> = '-'` to list Clusters for all Instances in a project,
 *   e.g., `projects/myproject/instances/-`.
 *
 * @property {string} pageToken
 *   The value of `next_page_token` returned by a previous call.
 *
 * @typedef ListClustersRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListClustersRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var ListClustersRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for BigtableInstanceAdmin.ListClusters.
 *
 * @property {Object[]} clusters
 *   The list of requested clusters.
 *
 *   This object should have the same structure as [Cluster]{@link google.bigtable.admin.v2.Cluster}
 *
 * @property {string[]} failedLocations
 *   Locations from which Cluster information could not be retrieved,
 *   due to an outage or some other transient condition.
 *   Clusters from these locations may be missing from `clusters`,
 *   or may only have partial information returned.
 *
 * @property {string} nextPageToken
 *   Set if not all clusters could be returned in a single response.
 *   Pass this value to `page_token` in another request to get the next
 *   page of results.
 *
 * @typedef ListClustersResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListClustersResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var ListClustersResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableInstanceAdmin.DeleteCluster.
 *
 * @property {string} name
 *   The unique name of the cluster to be deleted. Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
 *
 * @typedef DeleteClusterRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.DeleteClusterRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var DeleteClusterRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * The metadata for the Operation returned by CreateInstance.
 *
 * @property {Object} originalRequest
 *   The request that prompted the initiation of this CreateInstance operation.
 *
 *   This object should have the same structure as [CreateInstanceRequest]{@link google.bigtable.admin.v2.CreateInstanceRequest}
 *
 * @property {Object} requestTime
 *   The time at which the original request was received.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} finishTime
 *   The time at which the operation failed or was completed successfully.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef CreateInstanceMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateInstanceMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var CreateInstanceMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * The metadata for the Operation returned by UpdateInstance.
 *
 * @property {Object} originalRequest
 *   The request that prompted the initiation of this UpdateInstance operation.
 *
 *   This object should have the same structure as [PartialUpdateInstanceRequest]{@link google.bigtable.admin.v2.PartialUpdateInstanceRequest}
 *
 * @property {Object} requestTime
 *   The time at which the original request was received.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} finishTime
 *   The time at which the operation failed or was completed successfully.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef UpdateInstanceMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.UpdateInstanceMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var UpdateInstanceMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * The metadata for the Operation returned by CreateCluster.
 *
 * @property {Object} originalRequest
 *   The request that prompted the initiation of this CreateCluster operation.
 *
 *   This object should have the same structure as [CreateClusterRequest]{@link google.bigtable.admin.v2.CreateClusterRequest}
 *
 * @property {Object} requestTime
 *   The time at which the original request was received.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} finishTime
 *   The time at which the operation failed or was completed successfully.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef CreateClusterMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateClusterMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var CreateClusterMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * The metadata for the Operation returned by UpdateCluster.
 *
 * @property {Object} originalRequest
 *   The request that prompted the initiation of this UpdateCluster operation.
 *
 *   This object should have the same structure as [Cluster]{@link google.bigtable.admin.v2.Cluster}
 *
 * @property {Object} requestTime
 *   The time at which the original request was received.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} finishTime
 *   The time at which the operation failed or was completed successfully.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef UpdateClusterMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.UpdateClusterMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var UpdateClusterMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for BigtableInstanceAdmin.CreateAppProfile.
 *
 * @property {string} parent
 *   The unique name of the instance in which to create the new app profile.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>`.
 *
 * @property {string} appProfileId
 *   The ID to be used when referring to the new app profile within its
 *   instance, e.g., just `myprofile` rather than
 *   `projects/myproject/instances/myinstance/appProfiles/myprofile`.
 *
 * @property {Object} appProfile
 *   The app profile to be created.
 *   Fields marked `OutputOnly` will be ignored.
 *
 *   This object should have the same structure as [AppProfile]{@link google.bigtable.admin.v2.AppProfile}
 *
 * @property {boolean} ignoreWarnings
 *   If true, ignore safety checks when creating the app profile.
 *
 * @typedef CreateAppProfileRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateAppProfileRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var CreateAppProfileRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for BigtableInstanceAdmin.GetAppProfile.
 *
 * @property {string} name
 *   The unique name of the requested app profile. Values are of the form
 *   `projects/<project>/instances/<instance>/appProfiles/<app_profile>`.
 *
 * @typedef GetAppProfileRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GetAppProfileRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var GetAppProfileRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for BigtableInstanceAdmin.ListAppProfiles.
 *
 * @property {string} parent
 *   The unique name of the instance for which a list of app profiles is
 *   requested. Values are of the form
 *   `projects/<project>/instances/<instance>`.
 *
 * @property {string} pageToken
 *   The value of `next_page_token` returned by a previous call.
 *
 * @typedef ListAppProfilesRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListAppProfilesRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var ListAppProfilesRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Response message for BigtableInstanceAdmin.ListAppProfiles.
 *
 * @property {Object[]} appProfiles
 *   The list of requested app profiles.
 *
 *   This object should have the same structure as [AppProfile]{@link google.bigtable.admin.v2.AppProfile}
 *
 * @property {string} nextPageToken
 *   Set if not all app profiles could be returned in a single response.
 *   Pass this value to `page_token` in another request to get the next
 *   page of results.
 *
 * @typedef ListAppProfilesResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListAppProfilesResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var ListAppProfilesResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for BigtableInstanceAdmin.UpdateAppProfile.
 *
 * @property {Object} appProfile
 *   The app profile which will (partially) replace the current value.
 *
 *   This object should have the same structure as [AppProfile]{@link google.bigtable.admin.v2.AppProfile}
 *
 * @property {Object} updateMask
 *   The subset of app profile fields which should be replaced.
 *   If unset, all fields will be replaced.
 *
 *   This object should have the same structure as [FieldMask]{@link google.protobuf.FieldMask}
 *
 * @property {boolean} ignoreWarnings
 *   If true, ignore safety checks when updating the app profile.
 *
 * @typedef UpdateAppProfileRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.UpdateAppProfileRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var UpdateAppProfileRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for BigtableInstanceAdmin.DeleteAppProfile.
 *
 * @property {string} name
 *   The unique name of the app profile to be deleted. Values are of the form
 *   `projects/<project>/instances/<instance>/appProfiles/<app_profile>`.
 *
 * @property {boolean} ignoreWarnings
 *   If true, ignore safety checks when deleting the app profile.
 *
 * @typedef DeleteAppProfileRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.DeleteAppProfileRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var DeleteAppProfileRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * The metadata for the Operation returned by UpdateAppProfile.
 * @typedef UpdateAppProfileMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.UpdateAppProfileMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_instance_admin.proto}
 */
var UpdateAppProfileMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};