import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

export default function buildPlugins({ mode, paths }) {
  const idDev = mode === "development";
  const idProd = mode === "production";

  const plugins = [new HtmlWebpackPlugin({ template: paths.html })];

  if (idDev) {
    plugins.push(new webpack.ProgressPlugin());
  }

  if (idProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[name].[contenthash].css",
      })
    );
  }

  return plugins;
}
