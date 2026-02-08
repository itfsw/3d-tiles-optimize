export type TextureCompressResize = [number, number] | 'nearest-pot' | 'ceil-pot' | 'floor-pot'

/**
 * OptimizeOptions
 */
export interface OptimizeOptions extends Record<string, any> {
    logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
    combine: boolean;
    resample: boolean;
    prune: boolean;
    pruneAttributes: boolean;
    pruneSolidTextures: boolean;
    instance: boolean;
    instanceMin: number;
    dedup: boolean;
    flatten: boolean;
    join: boolean;
    joinNamed: boolean;
    joinMeshes: boolean;
    draco: boolean;
    meshopt: boolean;
    meshoptLevel: 'medium' | 'high';
    weld: boolean;
    palette: boolean;
    paletteMin: number;
    textureCompress: boolean;
    textureCompressTargetFormat: 'jpeg' | 'png' | 'webp' | 'avif';
    textureCompressResize: TextureCompressResize | false;
}