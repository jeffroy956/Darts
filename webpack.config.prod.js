var webpack = require("webpack");
var path = require("path");

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify("production")
  };

// variables
var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./dist");

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var buildPlugins = [
    new BundleAnalyzerPlugin({
        analyzerPort: 6101
    }
    ),
    //https://webpack.bootcss.com/guides/code-splitting-libraries/
    //https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318
    //https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
    
    new webpack.DefinePlugin(GLOBALS),
    new MiniCssExtractPlugin({
      filename: "darts-rc.css"
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ];

module.exports = {
    context: sourcePath,
    entry: {
        main: "./Index.tsx"
    },
    output: {
        path: outPath,
        publicPath: "/",
        filename: 'darts.js',
        library: "darts",
        libraryTarget: "umd"
    },
    target: "web",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    devtool: "source-map",
    module: {
        rules: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /node_modules/
            },
            //https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
            {
                test: /.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ],
    },
    plugins: buildPlugins
};
