'use strict';

var express = require('express');
var app = express();
var routes = require('./routes/routes.js');

var hostname = '127.0.0.1';
var port = 3000;

app.get('/transactions/:id', routes);
app.get('/transactions', routes);

app.listen(port, function () {
    console.log('Server running on http://' + hostname + ':' + port + '/');
});