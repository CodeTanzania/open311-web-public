const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

//parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('Express server is up on port', app.get('port'));
});