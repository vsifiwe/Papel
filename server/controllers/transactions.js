

import uuidv4 from 'uuid/v4';
import connect from '../middleware/connect';

class TransactionsController {

    static async debit(req, res) {
        const query = `INSERT INTO
      transactions (transactionid, createdon, cashier, t_accountnumber, transactiontype, amount)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
        const values = [
            uuidv4(),
            new Date(),
            req.body.cashier,
            req.body.accountnumber,
            req.body.transactiontype,
            req.body.amount
        ];

        try {
            const { rows } = await connect.query(query, values);
            return res.status(201).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async getAll(req, res) {
        const query = 'SELECT * FROM transactions';
        try {
            const { rows, rowCount } = await connect.query(query);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async getId(req, res) {
        const query = 'SELECT * FROM transactions WHERE id = $1';
        try {
            const { rows } = await connect.query(query, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'transaction not found' });
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    }

}

export default TransactionsController;
