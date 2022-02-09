import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'
import hashbang from "rollup-plugin-hashbang";

export default [
    // CommonJS for Node and ES module for bundlers build
    {
        input: 'packages/transformer/index.ts',
        external: ['path', 'fs-extra', 'source-map', 'lodash'],
        plugins: [
            json(),
            typescript(),
            hashbang(),
        ],
        output: [
            {  file: `packages/transformer/dist/octopus-transformer.cjs.js`, format: 'cjs' },
            {  file: `packages/transformer/dist/octopus-transformer.esm.js`, format: 'es' }
        ]
    },
    // {
    //     input: 'package/transformer/index.ts',
    //     external: ['ms'],
    //     plugins: [
    //         hashbang(),
    //         typescript()
    //     ],
    //     output: [
    //         {  file: pkg.main, format: 'cjs' },
    //         {  file: pkg.module, format: 'es' }
    //     ]
    // }
]
