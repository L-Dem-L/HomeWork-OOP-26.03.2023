const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = process.env.NODE_ENV !== 'production';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // filename: '[name].[contenthash].js',
        filename: 'scripts/[name].js',
        assetModuleFilename: 'assets/images/[name][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: 'index.html',
            }
        ),
        new MiniCssExtractPlugin({
            // filename: '[name].[contenthash].css'
            filename: 'styles/[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'pages/[name].[ext]',
                        }
                    }
                ],
                exclude: [path.resolve(__dirname, 'src', 'index.html'),
                path.resolve(__dirname, 'src', 'components', '*.html')],
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('postcss-preset-env')
                            ]
                        }
                    }
                },
                    'sass-loader'
                ],
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][ext]'
                }
            }
        ]
    }
}