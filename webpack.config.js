const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "production",
  devtool: "source-map",
  output: {
    library: "secretjs",
    libraryTarget: "umd",
    globalObject: "this",
    path: path.resolve(__dirname, "dist"),
    filename: "browser.js",
  },
};
