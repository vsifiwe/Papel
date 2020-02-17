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
app.get('/accounts/:accountnumber/transactions', _accounts.all_account_transactions);
app.get('/user/:email/accounts', _users.all_account_email);
app.get('/accounts', _accounts.all_accounts);
app.get('/accounts/:accountnumber', _accounts.specific_account_details);

exports.default = app;

// all_accounts from accounts.js not finished