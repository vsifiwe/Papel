"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all_account_transactions = all_account_transactions;
exports.all_accounts = all_accounts;
exports.specific_account_details = specific_account_details;

var _connect = require("../middleware/connect");

var pool = (0, _connect.get_connection)();

function all_account_transactions(req, res) {
    var accountnumber = req.params.accountnumber;
    pool.connect(function (err, client, done) {
        var query = "select * from transactions where t_accountnumber ='" + accountnumber + "'";
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

// finish writing this query

function all_accounts(req, res) {
    pool.connect(function (err, client, done) {
        var query = "select a.createdon, a.accountnumber, u.email, a.a_type, a.status, a.balance from accounts a, users u where a.owner=u.u_id;";
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

function specific_account_details(req, res) {
    var accountnumber = req.params.accountnumber;
    pool.connect(function (err, client, done) {
        var query = "select a.createdon, a.accountnumber, u.email, a.a_type, a.status, a.balance from accounts a, users u where a.owner=u.u_id and a.accountnumber = '" + accountnumber + "';";
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