/**
 * Dimensions (labels) associated with a Bigtable metric. These
 * dimensions provide context for the metric values.
 */
export interface Dimensions {
  projectId: string;
  instanceId: string;
  table: string;
  cluster?: string | null;
  zone?: string | null;
  appProfileId?: string;
  methodName: string;
  attemptStatus?: string;
  finalOperationStatus?: string;
  streamingOperation?: string;
  clientName: string;
}

export function dimensionsToString(d: Dimensions) {
  const p = (dimension?: string | null) => (dimension ? dimension : '');
  return `${p(d.projectId)};${p(d.instanceId)};${p(d.table)};${p(d.cluster)};${p(d.zone)};${p(d.appProfileId)};${p(d.methodName)};${p(d.attemptStatus)};${p(d.finalOperationStatus)};${p(d.streamingOperation)};${p(d.clientName)}`;
}
