'use strict';

var express = require('express');
var app = express.Router();

var bodyParser = require('body-parser');
var pg = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool({
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

app.get('/transactions', function (req, res) {
    pool.connect(function (err, client, done) {
        var query = 'SELECT * FROM transactions';
        client.query(query, function (error, result) {
            done();
            if (error) {
                res.status(400).json({ error: error });
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: '404'
                });
            } else {
                res.status(200).send({
                    status: '200',
                    data: result.rows

                });
            }
        });
    });
});

app.get('/transactions/:id', function (req, res) {
    var id = req.params.id;
    pool.connect(function (err, client, done) {
        var query = "SELECT * FROM transactions WHERE t_id ='" + id + "'";
        client.query(query, function (error, result) {
            done();
            if (error) {
                res.status(400).json({ error: error });
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: '404'
                });
            } else {
                res.status(200).send({
                    status: '200',
                    data: result.rows
                });
            }
        });
    });
});

app.get('/accounts/:accountnumber/transactions', function (req, res) {
    var accountnumber = req.params.accountnumber;
    pool.connect(function (err, client, done) {
        var query = "SELECT * FROM transactions WHERE t_accountnumber ='" + accountnumber + "'";
        client.query(query, function (error, result) {
            done();
            if (error) {
                res.status(400).json({ error: error });
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: '404'
                });
            } else {
                res.status(200).send({
                    status: '200',
                    data: result.rows
                });
            }

            pool.end;
        });
    });
});

module.exports = app;