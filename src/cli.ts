import {program, Validator} from './program.js';
import {optimize} from "./optimize/index.js";

// OPTIMIZE
program.command('optimize', 'Optimize 3d-tiles by 3d-tiles-tools and glTF-Transform')
    // input output
    .argument('<input>', 'Dir to read 3d-tiles')
    .argument('<output>', 'Dir to write output')
    // options
    // action
    .action(async ({args, options, logger}) => {
        return optimize(args.input as string, args.output as string, logger);
    });

export {Validator, program};
