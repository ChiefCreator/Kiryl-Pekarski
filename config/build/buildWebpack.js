import buildDevServer from "./buildDevServer.js";
import buildLoaders from "./buildLoaders.js";
import buildPlugins from "./buildPlugins.js";
import buildResolves from "./buildResolves.js";

export default function buildWebpack(options) {
  const { mode, paths } = options;

  const idDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolves(options),
    plugins: buildPlugins(options),
    devtool: idDev && "inline-source-map",
    devServer: idDev ? buildDevServer(options) : undefined,
  };
}
