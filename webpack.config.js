const path = require("path");
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
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new NodePolyfillPlugin()],
  mode: "production",
  output: {
    library: "secretjs",
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
