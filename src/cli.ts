import {program, Validator} from './program.js';
import {optimize} from "./optimize/functions.js";
import {Loggers} from "3d-tiles-tools";
import type {OptimizeOptions} from "./types.js";

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
    .option('--resample.enable <resample.enable>', 'Enable Losslessly resample animation frames.', {
        validator: Validator.BOOLEAN,
        default: true,
    })
    // action
    .action(async ({args, options}) => {
        const opts = options as OptimizeOptions
        // 日志
        Loggers.setLevel(opts.logLevel);
        return optimize(args.input as string, args.output as string, opts);
    });

export {Validator, program};
