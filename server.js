const Express = require('express');
const path = require('path');
const http = require('http');
const webpack = require('webpack');

const webpackConfig = require('./build/webpack.dev.config');

// default port where dev server listens for incoming traffic
const PORT = process.env.PORT || 3080;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware


const app = Express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    heartbeat: 5000
});


// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);


app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './src/index.html')); 
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
