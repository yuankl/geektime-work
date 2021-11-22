const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: "./src/main.js",
    module: {
        rules: [{ test: /\.vue$/, use: 'vue-loader' }],
    },

    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "src/*.html", to: "[name].[ext]" },

            ],
        }),
    ]
};