const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const api = 'http://dawasco.herokuapp.com';

app.set('port', (process.env.PORT || 3000));

//parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const apiProxy = proxy('/api', { target: api, changeOrigin: true, pathRewrite: { '^/api': '' } });
app.use(apiProxy);

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('Express server is up on port', app.get('port'));
});