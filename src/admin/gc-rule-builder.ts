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

import {google} from '../../protos/protos';

export type IGcRule = google.bigtable.admin.v2.IGcRule;
export type IDuration = google.protobuf.IDuration;

export class GcRuleBuilder {
  parameters: IGcRule;

  static new(parameters: IGcRule = {}): GcRuleBuilder {
    return new GcRuleBuilder(parameters);
  }

  // We want this to be able to keep working even if more rule parameters are
  // added later via autogen. So what this does is assume that we have possible
  // values of {intersection | union} that must be empty, and everything else
  // is a GC rule parameter, of which only one should be present per rule.
  constructor(parameters: IGcRule) {
    this.parameters = Object.assign({}, parameters);

    // We only want basic parameters, not the rules themselves.
    if (this.parameters.intersection || this.parameters.union) {
      throw new Error(
        'union and intersection parameters must be specified through builder methods',
      );
    }

    // Make sure there's only one rule specified in the parameters.
    const count = this.numParams;
    if (count > 1) {
      throw new Error(
        `only one parameter may be specified per rule (${this.parameters})`,
      );
    }
  }

  get numParams(): number {
    let count = 0;
    const paramObj = this.parameters as unknown as Record<string, unknown>;
    for (const n of Object.keys(this.parameters)) {
      if (n === 'union' || n === 'intersection') {
        continue;
      }

      if (paramObj[n]) {
        count++;
      }
    }

    return count;
  }

  intersection(...subRules: GcRuleBuilder[]): GcRuleBuilder {
    if (this.parameters.intersection || this.parameters.union) {
      throw new Error(
        `builder already has ${this.parameters.intersection ? 'an intersection' : 'a union'} `,
      );
    }
    if (subRules.length < 2) {
      throw new Error(
        `an intersection must pass at least 2 rules (${subRules.length} passed)`,
      );
    }

    this.parameters.intersection = {
      rules: subRules.map(r => r.build()),
    };

    return this;
  }

  union(...subRules: GcRuleBuilder[]): GcRuleBuilder {
    if (this.parameters.intersection || this.parameters.union) {
      throw new Error(
        `builder already has ${this.parameters.intersection ? 'an intersection' : 'a union'} `,
      );
    }
    if (subRules.length < 2) {
      throw new Error(
        `a union must pass at least 2 rules (${subRules.length} passed)`,
      );
    }

    this.parameters.union = {
      rules: subRules.map(r => r.build()),
    };

    return this;
  }

  build(): IGcRule {
    const count = this.numParams;
    if (!count && !this.parameters.union && !this.parameters.intersection) {
      throw new Error(`no rules were specified (${this.parameters})`);
    }
    if (count && (this.parameters.union || this.parameters.intersection)) {
      throw new Error(
        `unions and intersection cannot specify rule parameters (${this.parameters})`,
      );
    }

    return this.parameters;
  }

  /*static makeRule(gcRule: GcRule): google.bigtable.admin.v2.IGcRule {
    const rules: IGcRule[] = [];

    if (gcRule.maxAge) {
      rules.push({
        maxAge: gcRule.maxAge as google.protobuf.IDuration,
      });
    }

    if (gcRule.maxVersions) {
      rules.push({
        maxNumVersions: gcRule.maxVersions,
      });
    }

    if (gcRule.rule) {
      rules.push(this.makeRule(gcRule.rule));
    }

    if (rules.length === 1) {
      if (gcRule.ruleType === RuleType.union) {
        throw new Error(
          'A union must have more than one garbage collection rule.',
        );
      }

      if (gcRule.ruleType === RuleType.intersection) {
        throw new Error(
          'An intersection must have more than one garbage collection rule.',
        );
      }

      if (
        gcRule.ruleType === RuleType.union &&
        gcRule.ruleType === RuleType.intersection
      ) {
        throw new Error(
          'A garbage collection rule cannot be both a union and an intersection.',
        );
      }

      return rules[0];
    }

    if (rules.length === 0) {
      throw new Error('No garbage collection rules were specified.');
    }

    const rule = {} as google.bigtable.admin.v2.IGcRule;
    const ruleType =
      gcRule.ruleType === RuleType.union ? 'union' : 'intersection';

    rule[ruleType] = {
      rules,
    };

    return rule;
  } */
}

function test() {
  const rule = GcRuleBuilder.new()
    .intersection(
      GcRuleBuilder.new({
        maxAge: {
          seconds: 1000,
          nanos: 20000,
        },
      }),
      GcRuleBuilder.new({
        maxNumVersions: 50,
      }),
    )
    .build();
  console.log(rule);
}
