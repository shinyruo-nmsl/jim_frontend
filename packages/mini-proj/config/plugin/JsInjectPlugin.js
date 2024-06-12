const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class JSInjectPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { path: _path } = this.options;
    let injectCode = "";

    try {
      injectCode = fs
        .readFileSync(path.resolve(__dirname, _path), "utf-8")
        .toString();
    } catch (err) {
      console.log("js read file err:", err);
    }

    const scriptStr = `<script>${injectCode}</script>`;

    compiler.hooks.compilation.tap("JSInjectPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(
        "JSInjectPlugin",
        (htmlPluginData, callback) => {
          const htmlStr = htmlPluginData.html.toString();
          htmlPluginData.html = htmlStr.replace(/<body>/, "<body>" + scriptStr);
          callback(null, htmlPluginData);
        },
      );
    });
  }
}

module.exports = JSInjectPlugin;
