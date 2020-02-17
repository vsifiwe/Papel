'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes/routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


var hostname = '127.0.0.1';
var port = 3000;

app.use(_routes2.default);

app.listen(port, function () {
    console.log('Server running on http://' + hostname + ':' + port + '/');
});

exports.default = app;