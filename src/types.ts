/**
 * OptimizeOptions
 */
export interface OptimizeOptions extends Record<string, any> {
    logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent'
    combine: boolean
    resampleEnable: boolean
    pruneEnable: boolean
    dedupEnable: boolean
}