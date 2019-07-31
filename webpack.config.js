const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',

    devServer: {
        contentBase: './src',
        // watchContentBase: true,
        hot: true,
      },

      entry: './src/index.js',

      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
      },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        // Needed to enable HMR
      new webpack.HotModuleReplacementPlugin()
    ]
}