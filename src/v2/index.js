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

'use strict';

const BigtableClient = require('./bigtable_client');
const BigtableInstanceAdminClient = require('./bigtable_instance_admin_client');
const BigtableTableAdminClient = require('./bigtable_table_admin_client');

module.exports.BigtableClient = BigtableClient;
module.exports.BigtableInstanceAdminClient = BigtableInstanceAdminClient;
module.exports.BigtableTableAdminClient = BigtableTableAdminClient;
