import {defineConfig} from 'tsdown';

export default defineConfig({
    format: 'esm',
    platform: 'node',
    treeshake: {moduleSideEffects: false},
    inputOptions: {resolve: {mainFields: ['module', 'main']}}
});
