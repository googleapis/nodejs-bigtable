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
'use strict';

const getRowResponse = ({id, data}) => ({
  key: Buffer.from(id),
  families: Object.entries(data).map(([familyKey, familyValue]) => ({
    name: familyKey,
    columns: Object.entries(familyValue).map(([columnKey, columnValue]) => ({
      qualifier: Buffer.from(columnKey),
      cells: columnValue.map(({labels, timestamp, value}) => ({
        timestamp_micros: timestamp,
        value: Buffer.from(value),
        labels,
      })),
    })),
  })),
});

module.exports = getRowResponse;
