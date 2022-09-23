import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';

// These should be converted to modules instead.
const workerScripts = [
    'js/ddmlib/*',
    'js/file_load_worker.js',
    'js/constants.js',
    'js/utils.js',
    'third_party/jszip.min.js',
]

export default [
    {
        plugins: [
            html({
                input: 'index.html',
            }),
            summary(),
            copy({
                patterns: [
                    'commands/**/*',
                    'css/*.png',
                    ...workerScripts
                ],
            }),
        ],
        output: {
            dir: 'build',
        },
    },
    {
        input: 'src/motion/motion_action.ts',
        output: {
            file: 'build/motion/motion_action.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            summary(),
            typescript(),
        ]
    }
]