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

import * as util from 'node:util';
import {google} from '../../protos/protos';

export type IGcRule = google.bigtable.admin.v2.IGcRule;
export type IDuration = google.protobuf.IDuration;

export type GcUnion = Pick<IGcRule, 'union'>;
export type GcIntersection = Pick<IGcRule, 'intersection'>;
export type GcGrouping = GcUnion | GcIntersection;
export type GcRuleItem = Omit<IGcRule, 'union' | 'intersection'>;

function isUnion(rule: IGcRule): rule is GcUnion {
  return !!rule.union;
}

function isIntersection(rule: IGcRule): rule is GcIntersection {
  return !!rule.intersection;
}

function isGrouping(rule: IGcRule): rule is GcGrouping {
  return isUnion(rule) || isIntersection(rule);
}

function isRuleItem(rule: IGcRule): rule is GcRuleItem {
  return !isUnion(rule) && !isIntersection(rule);
}

/**
 * Helper class for building valid garbage collection rules. TypeScript is
 * recommended here for the maximum help, as types will guide user code at
 * runtime; however, some correctness checking happens at runtime to help
 * JavaScript users as well.
 */
export class GcRuleBuilder {
  /**
   * Runtime checks for JavaScript code.
   * @private
   */
  static checkGroupingItem(p: GcGrouping | GcRuleItem): void {
    if (!isGrouping(p) && !isRuleItem(p)) {
      throw new Error(
        `Parameter ${util.format('%o', p)} is not a union, intersection, or rule`,
      );
    }
    if (isUnion(p) && isIntersection(p)) {
      throw new Error(
        `Parameter ${util.format('%o', p)} is both a union and intersection`,
      );
    }
    if (isGrouping(p) && isRuleItem(p)) {
      throw new Error(
        `Parameter ${util.format('%o', p)} is both a union and/or intersection, and a rule`,
      );
    }
  }

  /**
   * Runtime checks for JavaScript code.
   * @private
   */
  static checkRuleItem(p: GcRuleItem): void {
    if (!isRuleItem(p)) {
      throw new Error(
        `Parameter ${util.format('%o', p)} is not a rule (or not only a rule)`,
      );
    }
  }

  /**
   * Unions are formed from other groupings (union, intersection) and potentially
   * rules (e.g. maxAge). They will match if any of the items are true.
   *
   * @param params Groupings and/or rules to be included
   * @returns [IGcRule] A newly built group
   */
  static union(...params: Array<GcGrouping | GcRuleItem>): GcGrouping {
    if (params.length < 2) {
      throw new Error(
        `Unions should contain at least two items (passed: ${params.length})`,
      );
    }

    params.forEach(GcRuleBuilder.checkGroupingItem);

    return {
      union: {
        rules: params,
      },
    };
  }

  /**
   * Intersections are formed from other groupings (union, intersection) and potentially
   * rules (e.g. maxAge). They will match if all of the items are true.
   *
   * @param params Groupings and/or rules to be included
   * @returns [IGcRule] A newly built group
   */
  static intersection(...params: Array<GcGrouping | GcRuleItem>): GcGrouping {
    if (params.length < 2) {
      throw new Error(
        `Intersections should contain at least two items (passed: ${params.length})`,
      );
    }

    params.forEach(GcRuleBuilder.checkGroupingItem);

    return {
      intersection: {
        rules: params,
      },
    };
  }

  /**
   * Rules are leaf nodes and contain constraints such as maxAge and maxNumVersions.
   *
   * @param params [IGcRule] Filled rule
   * @returns [IGcRule] A typed/checked rule
   */
  static rule(rule: GcRuleItem): GcRuleItem {
    GcRuleBuilder.checkRuleItem(rule);
    return rule;
  }
}
