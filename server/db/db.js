import { Pool } from 'pg';



const config = {
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('connected to the Database');
});



const createTables = () => {
    const accountsTable = `CREATE TABLE IF NOT EXISTS 
    accounts(
        a_id SERIAL PRIMARY KEY, 
        accountNumber SERIAL NOT NULL UNIQUE, 
        createdon TIMESTAMPTZ NOT NULL, 
        owner INT references users(u_id), 
        a_type VARCHAR(10) CHECK (a_type IN ('savings','current')) NOT NULL,
        status VARCHAR(10) CHECK (status IN ('draft','active','dormant')),
        balance NUMERIC(100,2) DEFAULT 10000)`;

    const transactionsTable = `CREATE TABLE IF NOT EXISTS 
    transactions(
        t_id SERIAL PRIMARY KEY,
        createdon TIMESTAMPTZ NOT NULL, 
        t_type VARCHAR(10) CHECK (t_type IN ('credit','debit')) NOT NULL,
        t_accountnumber INT references accounts(accountnumber) NOT NULL,
        cashier INT references users(u_id),
        amount NUMERIC(100,2),
        oldbalance NUMERIC(100,2),
        newbalance NUMERIC(100,2) )`;

    const usersTable = `CREATE TABLE IF NOT EXISTS 
    users(
        u_id SERIAL PRIMARY KEY,
        email VARCHAR(25) NOT NULL,
        firstname VARCHAR(25) NOT NULL,
        lastname VARCHAR(25) NOT NULL,
        password VARCHAR(15) NOT NULL,
        type VARCHAR(15) CHECK (type IN ('client','staff'))NOT NULL,
        isadmin BOOL NOT NULL)`;

    pool.query(usersTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    pool.query(accountsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    pool.query(transactionsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};




pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export default {
    createTables,
    pool,
};


import 'make-runnable';