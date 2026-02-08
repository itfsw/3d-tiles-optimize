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
    simplify: boolean;
    simplifyError: number;
    simplifyRatio: number;
    simplifyLockBorder: boolean;
    palette: boolean;
    paletteMin: number;
    sparse: boolean;
    textureCompress: 'ktx2' | 'webp' | 'avif' | 'auto' | false;
    textureCompressResize: TextureCompressResize | false;
    limitInputPixels: boolean;
}