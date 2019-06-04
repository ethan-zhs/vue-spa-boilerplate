const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {    
    entry: {
        main: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, '../src/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },

    module: {
        rules: [            
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'postcss-loader'
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ],
                include: [
                    path.join(__dirname, '../node_modules/iview'),
                    path.join(__dirname, '../node_modules/quill')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    }, 
                    'postcss-loader', 
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico|woff|woff2|eot|ttf|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer],
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../src/index.html'),   // 模板路径
            inject: true,  // js插入位置
            chunksSortMode: 'dependency',
            chunks: ['manifest', 'vendor', path.join(__dirname, '../src/index.js')],
            hash: true
        }) 
    ],

    optimization: {
        minimize: true,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks:{
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
});