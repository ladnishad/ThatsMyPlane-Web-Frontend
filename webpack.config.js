import createReactAppConfig from 'react-scripts/config/webpack.config';

const customConfig = {
  ...createReactAppConfig,
  module: {
    ...createReactAppConfig.module,
    rules: [
      ...createReactAppConfig.module.rules,
      {
        test: /\.worker.js$/,
        loader: 'worker-loader',
        options: { /* ... */ }
      },
    ],
  },
};

export default customConfig;
