'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get_connection = get_connection;

var _pg = require('pg');

var pool = new _pg.Pool({
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

function get_connection() {
    return pool;
}