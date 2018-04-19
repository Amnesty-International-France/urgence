const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.output.publicPath = '';

  return defaultConfig;
};
