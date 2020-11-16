var path = require('path');

const GoogleFontsPlugin = require('google-fonts-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './js/app.js',
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
    }),
    new GoogleFontsPlugin('./config.json')

  ],
  resolve : {

    alias : {

      dist : path.resolve(__dirname, 'dist/'),
      css : path.resolve(__dirname, 'css/'),
      constants : path.resolve(__dirname, 'js/constants/'),
      components : path.resolve(__dirname, 'js/components/'),
      libraries : path.resolve(__dirname, 'js/libraries/'),
      utils : path.resolve(__dirname, 'js/utils/'),
      modules : path.resolve(__dirname, 'modules/'),
      modals : path.resolve(__dirname, 'js/modals/'),
      handleEvents : path.resolve(__dirname, 'js/handleEvents/')

    }

  }
};