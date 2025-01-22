import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import webpack from "webpack";

export default function buildPlugins({ mode, paths }) {
  const idDev = mode === "development";
  const idProd = mode === "production";

  const plugins = [
    new HtmlWebpackPlugin({ template: paths.html }),
  ];

  if (idDev) {
    plugins.push(
      new webpack.ProgressPlugin(),
    );
  }

  if (idProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[name].[contenthash].css",
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          filename: "minified-[name][hash][ext][query]",
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 80,
                progressive: true,
              },
              png: {
                quality: 80,
                compressionLevel: 9,
                adaptiveFiltering: true,
              },
            },
          },
        },
        generator: [
          {
            preset: "webp",
            implementation: ImageMinimizerPlugin.sharpGenerate,
            filename: "optimazed-[name][hash][ext][query]",
            options: {
              encodeOptions: {
                webp: {
                  quality: 80,
                  alphaQuality: 70,
                  lossless: false,
                },
              },
            },
          },
        ],
      }),
    );
  }

  return plugins;
}
