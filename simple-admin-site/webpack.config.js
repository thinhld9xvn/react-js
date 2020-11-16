var path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './frontend/js/admin/index.js',  
  output: {
    chunkFilename: '[id].js',
    crossOriginLoading: "anonymous",
    filename: 'bundle.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist')
  },  
  module: {
    
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      },     
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader?limit=100000'] }
    ]

  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })   
  ],
  resolve : {

    alias : {

      css : path.resolve(__dirname, 'frontend/css/'),
      constants : path.resolve(__dirname, 'frontend/js/admin/constants/'),
      components : path.resolve(__dirname, 'frontend/js/admin/components/'),
      libraries : path.resolve(__dirname, 'frontend/js/admin/libraries/'),
      utils : path.resolve(__dirname, 'frontend/js/admin/utils/'),
      modules : path.resolve(__dirname, 'frontend/js/admin/modules/'),
      handleEvents : path.resolve(__dirname, 'frontend/js/admin/handleEvents/'),
      handleValidate : path.resolve(__dirname, 'frontend/js/admin/handleValidate/')

    }

  }
  
};