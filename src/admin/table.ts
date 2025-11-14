// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {BigtableTableAdminClient} from './v2';

/**
 * Service for creating, configuring, and deleting Cloud Bigtable tables.
 * Provides access to the table schemas only, not the data stored within
 * the tables.
 *
 * While users may create an instance of this class using the standard GAPIC
 * constructor parameters, it's recommended to obtain one by way of the
 * Bigtable.getTableAdminClient() method so that authentication and
 * configuration are all handled uniformly.
 *
 * @class
 * @memberof admin
 */
export class TableAdminClient extends BigtableTableAdminClient {}
