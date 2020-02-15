'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all_account_email = all_account_email;

var _pg = require('pg');

var pool = new _pg.Pool({
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

function all_account_email(req, res) {
    var email = req.params.email;
    pool.connect(function (err, client, done) {
        var query = "select * from accounts where owner = (select u_id from users where email like '" + email + "');";
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

exports.default = all_account_email;