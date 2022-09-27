import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {importMetaAssets} from '@web/rollup-plugin-import-meta-assets';
import {terser} from 'rollup-plugin-terser';
import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import summary from 'rollup-plugin-summary';

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
        // web-hv
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
            dir: 'dist',
        },
    },
    {
        // motion tools
        // The motion tools are built in a separate HTML to start with a fresh,
        // modern dev stack. Especially the bookmarkability of the connection
        // turned out to be hard to implement without substantial refactorings.
        input: 'motion.html',
        output: {
            entryFileNames: '[hash].js',
            chunkFileNames: '[hash].js',
            assetFileNames: '[hash][extname]',
            format: 'es',
            dir: 'dist',
        },
        preserveEntrySignatures: false,

        plugins: [
            /** Enable using HTML as rollup entrypoint */
            html({
                minify: true,
            }),
            /** Resolve bare module imports */
            nodeResolve(),
            /** Minify JS */
            terser(),
            /** Bundle assets references via import.meta.url */
            importMetaAssets(),
            /** Compile JS to a lower language target */
            babel({
                babelHelpers: 'bundled',
                presets: [
                    [
                        require.resolve('@babel/preset-env'),
                        {
                            targets: [
                                'last 3 Chrome major versions',
                                'last 3 Firefox major versions',
                                'last 3 Edge major versions',
                                'last 3 Safari major versions',
                            ],
                            modules: false,
                            bugfixes: true,
                        },
                    ],
                ],
                plugins: [
                    [
                        // require.resolve('babel-plugin-transform-typescript-metadata'),
                        require.resolve('babel-plugin-template-html-minifier'),
                        {
                            modules: {
                                lit: ['html',
                                    {name: 'css', encapsulation: 'style'}]
                            },
                            failOnError: false,
                            strictCSS: true,
                            htmlMinifier: {
                                collapseWhitespace: true,
                                conservativeCollapse: true,
                                removeComments: true,
                                caseSensitive: true,
                                minifyCSS: true,
                            },
                        },
                    ],
                ],
            }),
            summary(),
        ],
    }
]