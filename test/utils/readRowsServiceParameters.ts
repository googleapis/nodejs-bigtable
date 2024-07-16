export interface ReadRowsServiceParameters {
  keyFrom: number;
  keyTo: number;
  errorAfterChunkNo?: number;
  chunkSize: number;
  valueSize: number;
  chunksPerResponse: number;
}

export interface ChunkGeneratorParameters {
  keyFrom: number;
  keyTo: number;
  chunkSize: number;
  valueSize: number;
}
