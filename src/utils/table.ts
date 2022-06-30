import {GetRowsOptions, Table} from '../table';

export class TableUtils {
  static getRanges(options: GetRowsOptions) {
    const ranges = options.ranges || [];
    if (options.start || options.end) {
      if (options.ranges || options.prefix || options.prefixes) {
        throw new Error(
          'start/end should be used exclusively to ranges/prefix/prefixes.'
        );
      }
      ranges.push({
        start: options.start!,
        end: options.end!,
      });
    }
    if (options.prefix) {
      if (options.ranges || options.start || options.end || options.prefixes) {
        throw new Error(
          'prefix should be used exclusively to ranges/start/end/prefixes.'
        );
      }
      ranges.push(Table.createPrefixRange(options.prefix));
    }
    if (options.prefixes) {
      if (options.ranges || options.start || options.end || options.prefix) {
        throw new Error(
          'prefixes should be used exclusively to ranges/start/end/prefix.'
        );
      }
      options.prefixes.forEach(prefix => {
        ranges.push(Table.createPrefixRange(prefix));
      });
    }
    return ranges;
  }
}
