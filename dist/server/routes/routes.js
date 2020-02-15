'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _transactions = require('../controllers/transactions');

var _accounts = require('../controllers/accounts');

var _users = require('../controllers/users');

var app = (0, _express.Router)();

app.get('/transactions', _transactions.transactions_all);
app.get('/transactions/:id', _transactions.transactions_id);
app.get('/accounts/transactions/:accountnumber', _accounts.all_account_transactions);
app.get('/user/accounts/:email', _users.all_account_email);

exports.default = app;