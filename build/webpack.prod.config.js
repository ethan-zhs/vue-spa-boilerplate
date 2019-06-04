const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webpackConfig = merge(base, {
    entry: {
        main: path.join(__dirname, '../src/index.js'),
        vendor: ['vue', 'vuex', 'axios', 'vue-router', 'iview']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
        }),

        // new BundleAnalyzerPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name]_[hash:8].css',
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../src/tpl/index.tpl.html'),   // 模板路径
            inject: true,  // js插入位置
            chunksSortMode: 'dependency',
            hash: true
        }),
        
        new CopyWebpackPlugin([
            {from: 'statics/', to: path.join(__dirname, '../dist/statics')}
        ]),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma:8,
                    output: {
                        comments: false, // 保留注释
                        beautify: false  // 不需要格式化
                    },
                    compress: {
                        drop_console: true, // 去除console
                        collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            })
        ],
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


module.exports = webpackConfig;
