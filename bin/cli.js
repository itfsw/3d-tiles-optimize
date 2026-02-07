#!/usr/bin/env node

import {program} from '../dist/cli.mjs';

program.disableGlobalOption('--silent');
program.run();
