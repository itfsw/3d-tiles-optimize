import {Loggers} from "3d-tiles-tools";
import {program, Validator} from './program.js';
import type {OptimizeOptions} from "./types.js";
import {optimize} from "./optimize/functions.js";
import {INSTANCE_DEFAULTS, JOIN_DEFAULTS, PALETTE_DEFAULTS, SIMPLIFY_DEFAULTS} from "@gltf-transform/functions";

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
    .option('--combine <bool>', 'Combines all external tilesets into a single tileset.', {
        validator: Validator.BOOLEAN,
        default: false,
    })
    .option('--dedup <bool>', 'Deduplicate accessors and textures.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--prune <bool>', 'Removes properties from the file if they are not referenced by a Scene.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--prune.attributes <bool>', 'Whether to prune unused vertex attributes.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--prune.solidTextures <bool>', 'Whether to prune solid (single-color) textures, converting them to material factors.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--instance <bool>', 'Enable Create GPU instances from shared mesh references.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--instance.min <instance.min>', 'Number of instances required for instancing.', {
        validator: Validator.NUMBER,
        default: INSTANCE_DEFAULTS.min,
    })
    .option('--palette <bool>', 'Creates palette textures and merges materials.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--palette.min <min>', 'Minimum number of blocks in the palette texture. If fewer unique material values are found, no palettes will be generated.', {
        validator: Validator.NUMBER,
        default: PALETTE_DEFAULTS.min,
    })
    .option('--flatten <bool>', 'Flatten scene graph.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--join <bool>', 'Join meshes and reduce draw calls. Requires `--flatten`.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--join.meshes <bool>', 'Join distinct meshes and nodes. Requires `--join`.', {
        validator: Validator.BOOLEAN,
        default: !JOIN_DEFAULTS.keepMeshes,
    })
    .option('--join.named <bool>', 'Join named meshes and nodes. Requires `--join`.', {
        validator: Validator.BOOLEAN,
        default: !JOIN_DEFAULTS.keepNamed,
    })
    .option('--simplify <bool>', 'Simplify mesh geometry with meshoptimizer.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--simplify.error <error>', 'Simplification error tolerance, as a fraction of mesh extent.', {
        validator: Validator.NUMBER,
        default: SIMPLIFY_DEFAULTS.error,
    })
    .option('--simplify.ratio <ratio>', 'Target ratio (0–1) of vertices to keep.', {
        validator: Validator.NUMBER,
        default: SIMPLIFY_DEFAULTS.ratio,
    })
    .option('--simplify.lockBorder <bool>', 'Whether to lock topological borders of the mesh.', {
        validator: Validator.BOOLEAN,
        default: SIMPLIFY_DEFAULTS.lockBorder,
    })
    .option('--weld <bool>', 'Merge equivalent vertices. Required when simplifying geometry.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--draco <bool>', 'Enable Compress geometry with Draco.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--meshopt <bool>', 'Enable Compress geometry and animation with Meshopt.', {
        validator: Validator.BOOLEAN,
        default: false,
    })
    .option('--meshopt.level <level>', 'Meshopt compress level.', {
        validator: ['medium', 'high'],
        default: 'high',
    })
    .option('--textureCompress <bool>', 'Enable Textures Compress.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--textureCompress.targetFormat <format>', 'Target image format. If specified, included textures in other formats will be converted.', {
        validator: ['jpeg', 'png', 'webp', 'avif'],
        default: 'webp'
    })
    .option('--resample <bool>', 'Resample animations, losslessly deduplicating keyframes', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    .option('--textureCompress.resize <resize>', 'Resizes textures to given maximum [width,height] | false, preserving aspect ratio. Presets "nearest-pot", "ceil-pot", and "floor-pot" resize textures to power-of-two dimensions.', {
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
