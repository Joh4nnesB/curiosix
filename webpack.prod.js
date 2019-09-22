const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVELOPMENT__: JSON.stringify(false)
    })
  ],

  optimization: {
    runtimeChunk: 'multiple',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true,
            keep_fargs: false,
            ecma: 6,
            toplevel: true,
            module: true
          }
        }
      })
    ],
    minimize: true
  }
})
