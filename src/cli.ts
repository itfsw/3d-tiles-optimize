import {program, Validator} from './program.js';
import {optimize} from "./optimize/functions.js";
import {Loggers} from "3d-tiles-tools";

const logger = Loggers.get("CLI");

// OPTIMIZE
program.command('optimize', 'Optimize 3d-tiles by 3d-tiles-tools and glTF-Transform')
    // input output
    .argument('<input>', 'Dir to read 3d-tiles')
    .argument('<output>', 'Dir to write output')
    // options
    .option('--logLevel <logLevel>', 'The log level. Valid values are trace, debug, info, warn, error, fatal, and silent')
    // action
    .action(async ({args, options}) => {
        // 日志
        const logLevel = options.logLevel as string;
        if (logLevel !== undefined) {
            const validLogLevels = [
                "trace",
                "debug",
                "info",
                "warn",
                "error",
                "fatal",
                "silent",
            ];
            if (validLogLevels.includes(logLevel)) {
                Loggers.setLevel(logLevel);
            } else {
                logger.warn(`Invalid log level: ${logLevel}`);
                Loggers.setLevel("info");
            }
        }
        return optimize(args.input as string, args.output as string);
    });

export {Validator, program};
