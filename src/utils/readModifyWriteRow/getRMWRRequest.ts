import {Rule} from '../../row';
import {Mutation} from '../../mutation';
import arrify = require('arrify');
import * as protos from '../../../protos/protos';

type RMRWRequest = protos.google.bigtable.v2.IReadModifyWriteRowRequest;

interface RMWRRequestData {
  reqOpts: {
    tableName?: string;
    authorizedViewName?: string;
  };
  id: string;
  rules: Rule | Rule[];
  appProfileId?: string;
}

/**
 * This function will create a request that can be passed into the
 * readModifyWriteRequest method in the Gapic layer.
 *
 * @param {RMWRRequestData} request The readModifyWrite request information
 * that will be used to build the readModifyWrite request that will be sent to
 * the Gapic layer.
 * @returns {RMRWRequest} A request that can be passed into the
 * readModifyWriteRow method in the Gapic layer.
 */
export function getRMWRRequest(request: RMWRRequestData): RMRWRequest {
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

/**
 * This function will translate a request that is appropriate for the
 * readModifyWriteRow method in the Gapic layer into a request for the
 * handwritten layer that calls the readModifyWriteRow method under the hood.
 *
 * @param {RMWRRequest} request The request that is in a format that can be
 * passed into the readModifyWriteRow Gapic layer method
 * @return {RMWRRequestData} A readModifyWriteRow request that can be passed
 * into getRMWRRequest and return the original `request` parameter.
 */
export function getRMWRRequestInverse(request: RMRWRequest): RMWRRequestData {
  return {
    reqOpts: {},
    id: request.rowKey as string,
    rules: [],
  }; // TODO: Implement this function.
  /**
   * This function needs to be written so that for any `request` value we have
   * request === getRMWRRequestInverse(getRMWRRequest(request)) and
   * request === getRMWRRequest(getRMWRRequestInverse(request)). It will be used
   * by the readModifyWriteRow test proxy service to transform a Gapic request
   * into a request for the handwritten layer. getRMWRRequest and
   * getRMWRRequestInverse are required to be inverses so that when
   * getRMWRRequestInverse is applied in the test proxy service and then
   * getRMWRRequest is applied by the handwritten layer that the Gapic layer
   * receives the request that was originally passed into the test proxy
   * service. This will ensure the test proxy is actually testing the request
   * it is supposed to be testing.
   */
}
