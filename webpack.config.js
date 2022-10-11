const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            // plugins: ["babel-plugin-transform-bigint"],
          },
        },
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
