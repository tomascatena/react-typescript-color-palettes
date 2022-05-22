import { Configuration } from 'webpack';
// Empty import to fix devServer prop in Configuration
import {} from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import commonConfig from './webpack.common';
import path from 'path';

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  plugins: [new ReactRefreshPlugin()],
};

export default merge(commonConfig, devConfig);
