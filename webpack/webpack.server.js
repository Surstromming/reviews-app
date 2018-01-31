const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
    console.log('::-->>__SERVER__<<--::');
    
    return {
        devServer: {
            hot: true,
            contentBase: path.resolve(__dirname, '../dist'),
            publicPath: '/',
            compress: true,
            port: 9090,
            open: true,
            overlay: {
                errors: true
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": 'true'
            },
            historyApiFallback: true
        },
        output: {
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    ]
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
};
