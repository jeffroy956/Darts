var webpack = require("webpack");
var path = require("path");

// variables
var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./dist");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: sourcePath,
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: {
        main: "./Index.tsx"
    },
    output: {
        path: outPath,
        publicPath: "/",
    },
    target: "web",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            //https://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html
            {
                test: /.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
};
