const Express = require('express');
const proxy = require('http-proxy-middleware');
const storybook = require('@storybook/react/dist/server/middleware').default;
const app = new Express();
const port = 6006;
const api = ' http://127.0.0.1:5000';
const storybookConfig = './.storybook';

app.use(storybook(storybookConfig));

app.use(proxy('/api', { target: api, pathRewrite: { '^/api': '' } }));

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
});