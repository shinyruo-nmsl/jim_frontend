const JsInjectPlugin = require("./JsInjectPlugin.js");

module.exports = (ctx) => {
  ctx.modifyWebpackChain((args) => {
    const chain = args.chain;
    chain
      .plugin("JsInjectPlugin")
      .use(
        new JsInjectPlugin({
          path: "../../script/polyfill/text-decoder-encoder.js",
        }),
      )
      .after("miniPlugin");
  });
};
