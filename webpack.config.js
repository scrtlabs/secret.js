const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),

    // new webpack.DefinePlugin({
    //   XMLHttpRequest: require("xhr2"),
    // }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
    // fallback: {
    //   // util: require.resolve("util"),
    //   // assert: require.resolve("assert"),
    //   buffer: require.resolve("buffer"),
    //   crypto: require.resolve("crypto-browserify"),
    //   // http: require.resolve("stream-http"),
    //   // https: require.resolve('https-browserify'),
    //   // os: require.resolve("os-browserify/browser"),
    //   path: require.resolve("path-browserify"),
    //   stream: require.resolve("stream-browserify"),
    //   // zlib: require.resolve("browserify-zlib"),
    // },
  },
  mode: "production",
  output: {
    library: "secretjs",
    libraryTarget: "umd",
    globalObject: "this",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
