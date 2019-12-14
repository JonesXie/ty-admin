const path = require('path')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'axios',
      'js-cookie',
      'vue/dist/vue.min.js',
      'vue-i18n',
      'vue-router',
      'vuex',
      'element-ui'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({ 
        compress: {
          warnings: false
        }
      })
  ]
}