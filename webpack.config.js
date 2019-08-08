const path = require('path');
// const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'development',  // production
    devtool: "none",  //eval gone
    devServer: {
        contentBase: './src',
        open: true,
        hot: true,
      },

    entry: {
       main:  './src/index.js',
       vendor:  './src/vendor.js'
    },  
    output: {
      filename: '[name]-[hash:8].js',
      path: path.resolve(__dirname, 'dist')
    },

    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin()
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),

        new MiniCssExtractPlugin({ 
            filename: "[name]-[hash:8].css"
        }),

        new CleanWebpackPlugin(),

        // We can add new HTML page here

        // Needed to enable HMR
    //   new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Extract css into files
                    // "style-loader", // 3. Injects styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader" // 1. Turns sass into css
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { 
                            minimize: false // true for prod
                         }
                    }
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                    //   publicPath: './images',
                      outputPath: './images',
                      name: '[name].[ext]'
                    }
                  }
                ]
            },
        ]
    }
}