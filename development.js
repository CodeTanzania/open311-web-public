const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config/webpack.config.dev.js');
const compiler = webpack(config);
const proxy = require('http-proxy-middleware');
const api = 'http://dawasco.herokuapp.com';

app.set('port', (process.env.PORT || 3000));


app.use(webpackDevMiddleware(compiler, {
  publicPath: '/dist/'
}));
app.use(webpackHotMiddleware(compiler));

const apiProxy = proxy('/api', { target: api, changeOrigin: true, pathRewrite: { '^/api': '' } });
app.use(apiProxy);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log('The server is up and running on port', app.get('port'));
});
