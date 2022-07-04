// Copyright 2022 Google LLC
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

import {GetRowsOptions, PrefixRange, Table} from '../table';
import {Mutation} from '../mutation';
import * as is from 'is';
import {BoundData} from '../filter';

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

  static spliceRangesGetKeys(
    ranges: PrefixRange[],
    lastRowKey: string | number | true | Uint8Array,
    rowKeys: string[]
  ): string[] {
    // TODO: lhs and rhs type shouldn't be string, it could be
    // string, number, Uint8Array, boolean. Fix the type
    // and clean up the casting.
    const lessThan = (lhs: string, rhs: string) => {
      const lhsBytes = Mutation.convertToBytes(lhs);
      const rhsBytes = Mutation.convertToBytes(rhs);
      return (lhsBytes as Buffer).compare(rhsBytes as Uint8Array) === -1;
    };
    const greaterThan = (lhs: string, rhs: string) => lessThan(rhs, lhs);
    const lessThanOrEqualTo = (lhs: string, rhs: string) =>
      !greaterThan(lhs, rhs);

    // Readjust and/or remove ranges based on previous valid row reads.
    // Iterate backward since items may need to be removed.
    for (let index = ranges.length - 1; index >= 0; index--) {
      const range = ranges[index];
      const startValue = is.object(range.start)
        ? (range.start as BoundData).value
        : range.start;
      const endValue = is.object(range.end)
        ? (range.end as BoundData).value
        : range.end;
      const startKeyIsRead =
        !startValue ||
        lessThanOrEqualTo(startValue as string, lastRowKey as string);
      const endKeyIsNotRead =
        !endValue ||
        (endValue as Buffer).length === 0 ||
        lessThan(lastRowKey as string, endValue as string);
      if (startKeyIsRead) {
        if (endKeyIsNotRead) {
          // EndKey is not read, reset the range to start from lastRowKey open
          range.start = {
            value: lastRowKey,
            inclusive: false,
          };
        } else {
          // EndKey is read, remove this range
          ranges.splice(index, 1);
        }
      }
    }

    // Remove rowKeys already read.
    return rowKeys.filter(rowKey => greaterThan(rowKey, lastRowKey as string));
  }

  static createPrefixRange(start: string): PrefixRange {
    const prefix = start.replace(new RegExp('[\xff]+$'), '');
    let endKey = '';
    if (prefix) {
      const position = prefix.length - 1;
      const charCode = prefix.charCodeAt(position);
      const nextChar = String.fromCharCode(charCode + 1);
      endKey = prefix.substring(0, position) + nextChar;
    }
    return {
      start,
      end: {
        value: endKey,
        inclusive: !endKey,
      },
    };
  }
}
