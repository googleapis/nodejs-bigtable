import {Rule} from '../../row';
import {Mutation} from '../../mutation';
import arrify = require('arrify');

interface RMWRRequestData {
  reqOpts: {
    tableName?: string;
    authorizedViewName?: string;
  };
  id: string;
  rules: Rule | Rule[];
  appProfileId?: string;
}

export function getRMWRRequest(request: RMWRRequestData){
  const {reqOpts, id, rules, appProfileId} = request;
  if (!rules || (rules as Rule[]).length === 0) {
    throw new Error('At least one rule must be provided.');
  }

  const requestRules = arrify(rules).map(rule => {
    const column = Mutation.parseColumnName(rule.column);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleData: any = {
      familyName: column.family,
      columnQualifier: Mutation.convertToBytes(column.qualifier!),
    };

    if (rule.append) {
      ruleData.appendValue = Mutation.convertToBytes(rule.append);
    }

    if (rule.increment) {
      ruleData.incrementAmount = rule.increment;
    }

    return ruleData;
  });

  return Object.assign(
    {
      appProfileId: appProfileId,
      rowKey: Mutation.convertToBytes(id),
      rules: requestRules,
    },
    reqOpts
  );
}
