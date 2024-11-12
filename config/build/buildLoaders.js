import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function buildLoaders(options) {
  const idDev = options.mode === "development";
  const { paths } = options;

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      idDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
      {
        loader: "sass-resources-loader",
        options: {
          resources: [
            paths.styleMixins,
          ],
        },
      },
    ],
  };
  const expansionLoader = {
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  };
  const fileLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][hash][ext][query]',
    },
  };

  return [scssLoader, expansionLoader, fileLoader];
}
