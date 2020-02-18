import { get_connection } from '../middleware/connect';
const pool = get_connection();

export function transactions_all(req, res) {
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
}

export function transactions_id(req, res) {
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
}

export function homeaddress(req, req) {
    res.send("Welcome");
}

