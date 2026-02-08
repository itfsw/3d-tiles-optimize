import {Loggers} from "3d-tiles-tools";
import {program, Validator} from './program.js';
import type {OptimizeOptions} from "./types.js";
import {optimize} from "./optimize/functions.js";

// OPTIMIZE
program.command('optimize', 'Optimize 3d-tiles by 3d-tiles-tools and glTF-Transform')
    // input output
    .argument('<input>', 'Dir to read 3d-tiles')
    .argument('<output>', 'Dir to write output')
    // options
    .option('--logLevel <logLevel>', 'The log level. Valid values are trace, debug, info, warn, error, fatal, and silent', {
        validator: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
        default: 'warn'
    })
    .option('--combine <combine>', 'Combines all external tilesets into a single tileset.', {
        validator: Validator.BOOLEAN,
        default: false,
    })
    .option('--dedup.enable <dedup.enable>', 'Enable Deduplicate accessors and textures.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--prune.enable <prune.enable>', 'Enable Remove unreferenced properties from the file.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--instance.enable <instance.enable>', 'Enable Create GPU instances from shared mesh references.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--instance.min <instance.min>', 'Number of instances required for instancing.', {
        validator: Validator.NUMBER,
        default: 5,
    })
    .option('--draco.enable <draco.enable>', 'Enable Compress geometry with Draco.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--meshopt.enable <meshopt.enable>', 'Enable Compress geometry and animation with Meshopt.', {
        validator: Validator.BOOLEAN,
        default: false,
    })
    .option('--meshopt.level <meshopt.level>', 'Meshopt compress level.', {
        validator: ['medium', 'high'],
        default: 'high',
    })
    .option('--textureCompress.enable <textureCompress.enable>', 'Enable Textures Compress.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--textureCompress.targetFormat <textureCompress.targetFormat>', 'Target image format. If specified, included textures in other formats will be converted.', {
        validator: ['jpeg', 'png', 'webp', 'avif'],
        default: 'webp'
    })
    .option('--resample.enable <resample.enable>', 'Enable Resample animations, losslessly deduplicating keyframes.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--textureCompress.resize <textureCompress.resize>', 'Resizes textures to given maximum [width,height] | false, preserving aspect ratio. Presets "nearest-pot", "ceil-pot", and "floor-pot" resize textures to power-of-two dimensions.', {
        validator: (value) => {
            return new Promise((resolve, reject) => {
                if (value === false || (typeof value === 'string' && ['nearest-pot', 'ceil-pot', 'floor-pot'].includes(value))) {
                    resolve(value)
                } else if (typeof value === 'string') {
                    try {
                        const ary = JSON.parse(value)
                        if (Array.isArray(ary) && ary.length === 2) {
                            resolve(ary)
                        } else {
                            reject(new Error(`Unexpected resize array!`))
                        }
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(new Error(`Unexpected resize type!`))
                }
            })
        },
        default: false
    })
    // action
    .action(async ({args, options}) => {
        const opts = options as OptimizeOptions
        // 日志
        Loggers.setLevel(opts.logLevel);
        return optimize(args.input as string, args.output as string, opts);
    });

export {Validator, program};
