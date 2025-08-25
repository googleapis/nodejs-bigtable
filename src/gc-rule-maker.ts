import {IGcRule} from './family';
import * as protos from '../protos/protos';

enum RuleType {
  union = 'union',
  intersection = 'intersection',
}

export interface GcRule {
  maxAge?: protos.google.protobuf.IDuration | number;
  maxVersions?: number;
  rule?: GcRule;
  ruleType?: RuleType;
}

export class GCRuleMaker {
  static makeRule(gcRule: GcRule): protos.google.bigtable.admin.v2.IGcRule {
    const rules: IGcRule[] = [];

    if (gcRule.maxAge) {
      rules.push({
        maxAge: gcRule.maxAge as protos.google.protobuf.IDuration,
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

    const rule = {} as protos.google.bigtable.admin.v2.IGcRule;
    const ruleType =
      gcRule.ruleType === RuleType.union ? 'union' : 'intersection';

    rule[ruleType] = {
      rules,
    };

    return rule;
  }
}
