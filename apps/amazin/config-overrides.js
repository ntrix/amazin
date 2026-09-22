// react-app-rewired hook. Empty until now - added because CRA4's dev build
// (unlike its production build) fails to parse optional chaining (`?.`)
// shipped raw inside some node_modules packages (first hit: @sentry/core).
// webpack 4's own parser can't read that syntax at all, and for reasons not
// fully pinned down, the "process node_modules JS with babel" rule that
// normally strips it doesn't kick in for the dev build specifically - so
// force the plugins that do that transform onto it explicitly.
module.exports = function override(config) {
  const oneOfRule = config.module.rules.find((rule) => Array.isArray(rule.oneOf));
  const nodeModulesBabelRule = oneOfRule?.oneOf.find(
    (rule) => typeof rule.loader === 'string' && rule.loader.includes('babel-loader') && !rule.include
  );

  if (nodeModulesBabelRule) {
    nodeModulesBabelRule.options.plugins = [
      ...(nodeModulesBabelRule.options.plugins || []),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
    ];
  }

  return config;
};
