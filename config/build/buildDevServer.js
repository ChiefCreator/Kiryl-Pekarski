export default function buildDevServer({ port, paths }) {
  return {
    static: paths.devServer,
    port: port ?? 3000,
    open: true,
    compress: true,
  };
}
