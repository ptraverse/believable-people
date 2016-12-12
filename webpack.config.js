var glob = require("glob");
var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: glob.sync("./src/*.js"),
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: 'public/',
        filename: 'app.js'
    },
    resolve: {
        modulesDirectories: ["node_modules", "bower_components"]
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.sass$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ]
};