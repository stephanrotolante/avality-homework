const path = require('path');
const {NamedModulesPlugin, HotModuleReplacementPlugin} = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js",
        libraryTarget: "umd"
    },    
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
        //   {
        //     test: /\.(js|jsx)$/,
        //     exclude: /node_modules/,
        //     use: ['babel-loader']
        //   },
          {
            test: /\.css$/,
            use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
          },
          {
              test: /\.(ts|tsx)$/,
              use: 'ts-loader',
              exclude: /node_modules/
          }
        ]
      },
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
      }
}