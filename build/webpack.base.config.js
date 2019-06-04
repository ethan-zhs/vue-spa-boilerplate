const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDev = process.env.NODE_ENV == 'development';
const isProd = process.env.NODE_ENV == 'production';

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


const webpackConfig = {
    // devtool: isProd
    //     ? 'source-map'
    //     : 'cheap-module-eval-source-map',

    mode: isProd ? 'production' : 'development',

    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',                
                enforce: 'pre',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,                
                use: [{
                    loader: 'vue-loader',
                    options: {
                        cssModules: {
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            camelCase: true
                        },
                        extractCSS: false,
                        preserveWhitespace: false,
                        postcss: [
                            require('autoprefixer')({
                                browsers: [
                                    "> 1%",
                                    "last 5 versions",
                                    "not ie <= 8",
                                    "Android >= 4",
                                    "UCAndroid >= 9",
                                    "iOS >= 8"
                                ]
                            })
                        ]
                    }
                },
                {
                    loader: 'iview-loader',
                    options: {
                        prefix: false
                    }
                }]
                
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: resolve('src')
            }
        ]
    },

    performance: {
        maxEntrypointSize: 300000,
        hints: isDev ? false : 'warning'
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'Statics': path.resolve(__dirname, '../src/statics'),
            'Components': path.resolve(__dirname, '../src/components'),
            'Containers': path.resolve(__dirname, '../src/containers'),
            'Utils': path.resolve(__dirname, '../src/utils/utils'),
            'Global': path.resolve(__dirname, '../src/global'),
            'Services': path.resolve(__dirname, '../src/services')
        }
    },

    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development')
        })        
    ]
}

module.exports = webpackConfig;
