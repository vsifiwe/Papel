import Db from '../middleware/connect';


class TransactionsController {

    static getAll(req, res) {
        const sql = 'select * from transactions';
        Db.query(sql).then(response => {
            return res.json({ status: response.status, data: response })
        }).catch(error => console.log(error))
    }

    static getID(req, res) {
        const id = req.params.transactionid;
        const sql = 'select * from transactions where t_id = $1';
        var data = [id];
        Db.query(sql, data).then(response => {
            return res.json({ status: response.status, data: response })
        })
            .catch(error => console.log(error))
    }


}

export default TransactionsController


/*const transactions_all = async (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM transactions';
        client.query(query, (error, result) => {
            done();
            if (error) {
                res.status(400).json({ error })
            }
            if (result.rows < '1') {
                res.status(404).send({
                    status: '404'
                });
            } else {
                res.status(200).send({
                    status: '200',
                    data: result.rows,
                });
            }
        });
    });
};

*/


/*export function transactions_all(req, res) {
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
*/

