const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config/webpack.config.dev.js');
const compiler = webpack(config);

app.set('port', (process.env.PORT || 3000));

app.use(webpackDevMiddleware(compiler, {
	publicPath: '/dist/'
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

app.listen(app.get('port'), function () {
	console.log('The server is up and running on port', app.get('port'));
});
