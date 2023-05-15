import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';

import pkg from './package.json';

/** @type {import("rollup").RollupOptions} */
export default {
	input: 'src/index.ts',
	external: [/.json/, /node_modules/],
	output: { file: pkg.main, format: 'cjs', exports: 'named' },
	watch: {},
	plugins: [
		nodeResolve(),
		commonjs(),
		typescript2(),
		babel({
			babelHelpers: 'bundled',
		}),
	],
};
