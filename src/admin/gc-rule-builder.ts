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

export class GcRules {
  // Runtime checks for JavaScript code.
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

  // Runtime checks for JavaScript code.
  static checkRuleItem(p: GcRuleItem): void {
    if (!isRuleItem(p)) {
      throw new Error(
        `Parameter ${util.format('%o', p)} is not a rule (or not only a rule)`,
      );
    }
  }

  // Unions are formed from groupings and/or rules.
  static union(...params: Array<GcGrouping | GcRuleItem>): GcGrouping {
    params.forEach(GcRules.checkGroupingItem);

    return {
      union: {
        rules: params,
      },
    };
  }

  // Intersections are formed from groupings and/or rules.
  static intersection(...params: Array<GcGrouping | GcRuleItem>): GcGrouping {
    params.forEach(GcRules.checkGroupingItem);

    return {
      intersection: {
        rules: params,
      },
    };
  }

  static rule(rule: GcRuleItem): GcRuleItem {
    GcRules.checkRuleItem(rule);
    return rule;
  }
}

function test() {
  const rule = GcRules.intersection(
    GcRules.rule({
      maxAge: {
        seconds: 1000,
        nanos: 20000,
      },
    }),
    GcRules.rule({
      maxNumVersions: 50,
    }),
  );

  const rule2 = GcRules.union(
    rule,
    GcRules.rule({
      maxAge: {
        seconds: 50,
        nanos: 20,
      },
    }),
  );

  console.dir(rule2, {depth: null});
}
// test();

/*
Do we want to deal with these use cases?
          'A union must have more than one garbage collection rule.',
          'An intersection must have more than one garbage collection rule.',
*/
