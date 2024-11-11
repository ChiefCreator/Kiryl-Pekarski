import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function buildLoaders(options) {
  const idDev = options.mode === "development";

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      idDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: idDev ? "[path][name]__[local]" : "[hash:base64]",
          },
        },
      },
      ,
      "sass-loader",
    ],
  };
  const expansionLoader = {
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  };

  return [scssLoader, expansionLoader];
}
