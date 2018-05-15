const path = require("path");

const inlineSvg = config => {
    config.module.rules.unshift({
        test: /\.svg$/,
        loader: 'react-svg-loader',
    });

    const fileLoaderIndex = config.module.rules.findIndex(r => r.loader && r.loader.endsWith('cjs.js'));
    config.module.rules[fileLoaderIndex].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
};


module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.output.publicPath = '';

  inlineSvg(defaultConfig);

  return defaultConfig;
};
