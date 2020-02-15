import { Pool } from 'pg';
const pool = new Pool({
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
})

export function all_account_email(req, res) {
    const email = req.params.email;
    pool.connect((err, client, done) => {
        const query = "select * from accounts where owner = (select u_id from users where email like '" + email + "');";
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

export default all_account_email;