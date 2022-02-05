const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'

console.log('isProduction', isProduction)

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.ts',
        //js_file: './src/js_file.js',
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: './dist',
        port: 8887,
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'Development',
            filename: 'index.html',
            template: './index.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Development',
            filename: 'about.html',
            template: './modules/about-us/about.html',
            // chunks: [],
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon-pro.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
                // { from: './assets', to: './assets' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].bundle.css',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css|.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            //     options: {
            //         minimize: {
            //             removeComments: false,
            //             collapseWhitespace: false,
            //         },
            //     },
            // },
        ],
    },
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'producton'
    } else {
        config.mode = 'development'
    }
    return config
}
