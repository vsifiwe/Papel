'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transactions_all = transactions_all;
exports.transactions_id = transactions_id;

var _connect = require('../middleware/connect');

var pool = (0, _connect.get_connection)();

function transactions_all(req, res) {
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
}

function transactions_id(req, res) {
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
}