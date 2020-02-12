const pg = require('pg');

const config = {
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the Database');
});

“id” : Integer,
“accountNumber” : Integer,
“createdOn” : DateTime,
“owner” : Integer, // user id
“type” : String, // savings, current
“status” : String, // draft, active, or dormant
“balance” : Float,

const createTables = () => {
    const schoolTable = `CREATE TABLE IF NOT EXISTS
        accounts(
          id INT SERIAL PRIMARY KEY,
          accountNumber INT NOT NULL,
          createdon TIMESTAMPTZ NOT NULL,
          owner INT references users(),
          type VARCHAR(10) CHECK (type IN ('savings','çurrent')) NOT NULL,
          status VARCHAR(10) CHECK (status IN ('draft','active','dormant')),
          balance NUMERIC(100,2) DEFAULT 10000
        );`;
    pool.query(schoolTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
