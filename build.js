#!/usr/bin/env node
const { build } = require("esbuild");
const { Generator } = require("npm-dts");
const {
  NodeGlobalsPolyfillPlugin,
} = require("@esbuild-plugins/node-globals-polyfill");
const {
  NodeModulesPolyfillPlugin,
} = require("@esbuild-plugins/node-modules-polyfill");

build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  bundle: true,
  target: "chrome58",
  plugins: [
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
});

// new Generator({
//   entry: "src/index.ts",
//   output: "dist/index.d.ts",
// }).generate();
