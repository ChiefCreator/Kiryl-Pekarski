export default function buildResolves(options) {
  const { paths } = options;

  return {
    extensions: [".js", ".jsx"],
    alias: {
      "@fonts": paths.fonts,
    },
  };
}
