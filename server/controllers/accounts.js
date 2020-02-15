import { Pool } from 'pg';
const pool = new Pool({
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
})

export function all_account_transactions(req, res) {
    const accountnumber = req.params.accountnumber;
    pool.connect((err, client, done) => {
        const query = "select * from transactions where t_accountnumber ='" + accountnumber + "'";
        client.query(query, (error, result) => {
            done();
            if (error) {
                res.status(400).json({ error })
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: '404',
                });
            } else {
                res.status(200).send({
                    status: '200',
                    data: result.rows,
                });
            }
        });
    });
}

// finish writing this query

export function all_accounts(req, res) {
    pool.connect((err, client, done) => {
        const query = "select * from accounts";
        client.query(query, (error, result) => {
            done();
            if (error) {
                res.status(400).json({ error })
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: '404',
                });
            } else {
                res.status(200).send({
                    status: '200',
                    data: result.rows,
                });
            }
        });
    })

}
