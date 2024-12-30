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
  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][hash][ext][query]',
    },
  };
  const imgLoader = {
    test: /\.(jpg|png|webp)$/,
    type: 'asset/resource',
    generator: {
      filename: 'img/[name][hash][ext][query]',
    },
  };
  const model3DLoader = {
    test: /\.(glb|gltf|usd|usdc)$/,
    type: 'asset/resource',
    generator: {
      filename: '3d/[name][hash][ext][query]',
    },
  };
  const shaderLoader = {
    test: /\.(glsl|vs|fs)$/,
    loader: 'webpack-glsl-loader',
    exclude: /node_modules/,
  };
  const jsonLoader = {
    test: /\.json$/,
    loader: 'json-loader',
    type: 'javascript/auto'
  };


  return [scssLoader, expansionLoader, fontsLoader, imgLoader, model3DLoader, shaderLoader, jsonLoader];
}
