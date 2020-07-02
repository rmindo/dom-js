const path = require('path');



module.exports = {
  entry: [
    '@babel/polyfill',
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dist.js',
  },
  devServer: {
    port: 3000,
    contentBase: './public'
  },
  module: {
    rules: [{
        // test: /\.js?$/,
        test: /\.(js|css|jpg|jpeg|png|gif|eot|svg|otf|ttf|woff|woff2)$/,
        loader: 'babel-loader',
        query: {
           presets: ['@babel/preset-env'],
           plugins: ['import-static-files']
        }
    }]
  }
}
