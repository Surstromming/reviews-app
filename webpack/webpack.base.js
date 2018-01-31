const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    const isAnalize = env && env.anlz ? new BundleAnalyzerPlugin() : [];

    return {
        devtool: 'source-map',
        entry: {
            app: './app',
            vendor: [
                'babel-polyfill',
                'react',
                'react-dom'
            ]
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].bundle.js'
        },
        resolve: {
            extensions: ['.js', '.scss'],
            modules: [
                '../app',
                '../app/general/img',
                '../app/general/fonts',
                'node_modules'
            ],
            alias: {
                modernizr$: path.resolve(__dirname, '../.modernizrrc'),
                settings: path.resolve(__dirname, '../app/general/scss/settings/index.scss')
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env',
                            'react'
                        ],
                        plugins: [
                            'transform-object-assign',
                            'transform-object-rest-spread',
                            'transform-class-properties'
                        ]
                    }
                },
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader'
                },
                {
                    test: /\.modernizrrc(\.json)?$/,
                    use: [
                        'modernizr-loader',
                        'json-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    exclude: /svg[\/\\]/,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.svg$/,
                    include: /svg[\/\\]/,
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId: 'icon-[name]'
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('dist', {
                root: path.resolve(__dirname, '..')
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.NamedModulesPlugin(),
            new webpack.NamedChunksPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ].concat(isAnalize),
        stats: {
            children: false
        }
    }
};
