export type TextureCompressResize = [number, number] | 'nearest-pot' | 'ceil-pot' | 'floor-pot'

/**
 * OptimizeOptions
 */
export interface OptimizeOptions extends Record<string, any> {
    logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
    combine: boolean;
    resampleEnable: boolean;
    pruneEnable: boolean;
    instanceEnable: boolean;
    dedupEnable: boolean;
    dracoEnable: boolean;
    meshoptEnable: boolean;
    meshoptLevel: 'medium' | 'high';
    textureCompressEnable: boolean;
    textureCompressTargetFormat: 'jpeg' | 'png' | 'webp' | 'avif';
    textureCompressResize: TextureCompressResize | false;
}