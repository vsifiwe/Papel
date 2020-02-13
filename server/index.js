const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const config = {
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};
const pool = new pg.Pool(config);

app.get('/transactions', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM transactions';
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
});


app.get('/transactions/:id', (req, res) => {
    const id = req.params.id;
    pool.connect((err, client, done) => {
        const query = "SELECT * FROM transactions WHERE t_id ='" + id + "'";
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
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}/`);
});
