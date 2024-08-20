import {promisifyAll} from '@google-cloud/promisify';
import {Instance} from './instance';
import {Bigtable, SampleRowKeysCallback, SampleRowsKeysResponse} from './index';
import {google} from '../protos/protos';
import {CallOptions} from 'google-gax';
import {Transform} from 'stream';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const concat = require('concat-stream');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pumpify = require('pumpify');

export class TabularApiService {
  bigtable: Bigtable;
  instance: Instance;
  name: string;
  id: string;
  metadata?: google.bigtable.admin.v2.ITable;
  maxRetries?: number;

  constructor(instance: Instance, id: string) {
    this.bigtable = instance.bigtable;
    this.instance = instance;

    let name;

    if (id.includes('/')) {
      if (id.startsWith(`${instance.name}/tables/`)) {
        name = id;
      } else {
        throw new Error(`Table id '${id}' is not formatted correctly.
Please use the format 'prezzy' or '${instance.name}/tables/prezzy'.`);
      }
    } else {
      name = `${instance.name}/tables/${id}`;
    }

    this.name = name;
    this.id = name.split('/').pop()!;
  }

  sampleRowKeys(gaxOptions?: CallOptions): Promise<SampleRowsKeysResponse>;
  sampleRowKeys(gaxOptions: CallOptions, callback: SampleRowKeysCallback): void;
  sampleRowKeys(callback?: SampleRowKeysCallback): void;
  /**
   * Returns a sample of row keys in the table. The returned row keys will delimit
   * contiguous sections of the table of approximately equal size, which can be
   * used to break up the data for distributed tasks like mapreduces.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.keys The list of keys.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_sample_row_keys
   */
  sampleRowKeys(
    optionsOrCallback?: CallOptions | SampleRowKeysCallback,
    cb?: SampleRowKeysCallback
  ): void | Promise<SampleRowsKeysResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    this.sampleRowKeysStream(gaxOptions)
      .on('error', callback)
      .pipe(
        concat((keys: string[]) => {
          callback(null, keys);
        })
      );
  }

  /**
   * Returns a sample of row keys in the table as a readable object stream.
   *
   * See {@link Table#sampleRowKeys} for more details.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @returns {stream}
   *
   * @example
   * ```
   * table.sampleRowKeysStream()
   *   .on('error', console.error)
   *   .on('data', function(key) {
   *     // Do something with the `key` object.
   *   });
   *
   * //-
   * // If you anticipate many results, you can end a stream early to prevent
   * // unnecessary processing.
   * //-
   * table.sampleRowKeysStream()
   *   .on('data', function(key) {
   *     this.end();
   *   });
   * ```
   */
  sampleRowKeysStream(gaxOptions?: CallOptions) {
    const reqOpts = {
      tableName: this.name,
      appProfileId: this.bigtable.appProfileId,
    };

    const rowKeysStream = new Transform({
      transform(key, enc, next) {
        next(null, {
          key: key.rowKey,
          offset: key.offsetBytes,
        });
      },
      objectMode: true,
    });

    return pumpify.obj([
      this.bigtable.request({
        client: 'BigtableClient',
        method: 'sampleRowKeys',
        reqOpts,
        gaxOpts: Object.assign({}, gaxOptions),
      }),
      rowKeysStream,
    ]);
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(TabularApiService, {
  exclude: ['family', 'row'],
});
