'use strict';

var pg = require('pg');

var config = {
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

pool.on('connect', function () {
    console.log('connected to the Database');
});

var createTables = function createTables() {
    var accountsTable = 'CREATE TABLE IF NOT EXISTS \n    accounts(\n        a_id SERIAL PRIMARY KEY, \n        accountNumber SERIAL NOT NULL UNIQUE, \n        createdon TIMESTAMPTZ NOT NULL, \n        owner INT references users(u_id), \n        a_type VARCHAR(10) CHECK (a_type IN (\'savings\',\'current\')) NOT NULL,\n        status VARCHAR(10) CHECK (status IN (\'draft\',\'active\',\'dormant\')),\n        balance NUMERIC(100,2) DEFAULT 10000)';

    var transactionsTable = 'CREATE TABLE IF NOT EXISTS \n    transactions(\n        t_id SERIAL PRIMARY KEY,\n        createdon TIMESTAMPTZ NOT NULL, \n        t_type VARCHAR(10) CHECK (t_type IN (\'credit\',\'debit\')) NOT NULL,\n        t_accountnumber INT references accounts(accountnumber) NOT NULL,\n        cashier INT references users(u_id),\n        amount NUMERIC(100,2),\n        oldbalance NUMERIC(100,2),\n        newbalance NUMERIC(100,2) )';

    var usersTable = 'CREATE TABLE IF NOT EXISTS \n    users(\n        u_id SERIAL PRIMARY KEY,\n        email VARCHAR(25) NOT NULL,\n        firstname VARCHAR(25) NOT NULL,\n        lastname VARCHAR(25) NOT NULL,\n        password VARCHAR(15) NOT NULL,\n        type VARCHAR(15) CHECK (type IN (\'client\',\'staff\'))NOT NULL,\n        isadmin BOOL NOT NULL)';

    pool.query(usersTable).then(function (res) {
        console.log(res);
        pool.end();
    }).catch(function (err) {
        console.log(err);
        pool.end();
    });

    pool.query(accountsTable).then(function (res) {
        console.log(res);
        pool.end();
    }).catch(function (err) {
        console.log(err);
        pool.end();
    });

    pool.query(transactionsTable).then(function (res) {
        console.log(res);
        pool.end();
    }).catch(function (err) {
        console.log(err);
        pool.end();
    });
};

pool.on('remove', function () {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables: createTables,
    pool: pool
};

require('make-runnable');