const path = require('path');
const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // mirror the app's tsconfig `baseUrl` so bare imports like `src/constants` resolve
    // the same way they do in the app's own (CRA) build
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '..')];

    // the app's global CSS references image sprites with bare paths, e.g.
    // `url('src/assets/img/nav-sprite.png')`. CRA's own css-loader (nested under
    // react-scripts) resolves that as a module request; the css-loader Storybook
    // picks up from the workspace root does not and only tries it relative to the
    // CSS file, so the build fails. These sprites are decorative and not under
    // test here, so stop css-loader from trying to resolve/inline them at all
    // rather than dragging in a second css-loader major version just for this.
    for (const rule of config.module.rules) {
      for (const use of rule.use || []) {
        if (typeof use === 'object' && use.loader && use.loader.includes(`${path.sep}css-loader${path.sep}`)) {
          use.options = { ...use.options, url: false };
        }
      }
    }

    return config;
  }
};
