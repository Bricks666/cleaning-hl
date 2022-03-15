import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

import pkg from "./package.json";

/** @type {import("rollup").RollupOptions} */
export default {
	input: "src/index.js",
	external: [/.json/, /node_modules/],
	output: { file: pkg.main, format: "cjs", exports: "named" },
	watch: {},
	plugins: [
		nodeResolve(),
		commonjs(),
		json(),

		babel({
			babelHelpers: "bundled",
		}),
	],
};
