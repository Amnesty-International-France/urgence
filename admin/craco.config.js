const path = require("path");
const fs = require("fs");

/**
 * CRA has a ModuleScopePlugin that prohibits imports outside of the /src
 * directory. If you have code outside this directory (e.g. components shared
 * between multiple projects) then this becomes an issue. This plugin takes
 * options: {path: "/asbolute-path", name: "alias-you-want"} NOTE: For this to
 * work, the directory that you point to must have a package.json file
 */
// const enableImportOutsideSrcDir = {
//   overrideWebpackConfig: function enableImportOutsideSrcDir({
//     webpackConfig,
//     pluginOptions,
//     context: { paths, name },
//   }) {
//     const absolutePath = path.join(paths.appPath, pluginOptions.path);
//     const moduleScopePlugin = webpackConfig.resolve.plugins.find(
//       (plugin) => plugin.appSrcs && plugin.allowedFiles
//     );

//     if (moduleScopePlugin) {
//       moduleScopePlugin.appSrcs.push(absolutePath);
//     }

//     webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, {
//       [pluginOptions.name]: absolutePath,
//     });

//     return webpackConfig;
//   },
// };

// Handle relative paths to sibling packages
const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) =>
  path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: {
    configure: webpackConfig => {

      // ts-loader is required to reference external typescript projects/files (non-transpiled)
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [
          resolvePackage('node_modules/urgent_reaction'),
        ],
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.json',
        },
      })

      return webpackConfig;
    }
  }
};
