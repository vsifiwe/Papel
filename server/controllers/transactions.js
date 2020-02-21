
import connect from '../middleware/connect';

class TransactionsController {

    static async debit(req, res) {

        let query = 'SELECT newbalance FROM transactions where t_accountnumber = $1 ORDER BY createdon LIMIT 1'
        let data = [req.body.accountnumber]

        let { rows } = await connect.query(query, data)
        console.log(rows[0])

        query = `INSERT INTO 
        transactions (createdon, cashier, t_accountnumber, transactiontype, amount, oldbalance, newbalance)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;

        let balance = Number(rows[0]) - Number(req.body.amount)

        const values = [
            new Date(),
            req.body.cashier,
            req.params.accountnumber,
            'debit',
            req.body.amount,
            rows.newbalance,
            balance
        ];

        try {
            const { rows } = await connect.query(query, values);
            return res.status(201).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async credit(req, res) {
        let query = 'SELECT newbalance FROM transactions where t_accountnumber = $1 ORDER BY createdon LIMIT 1'
        let data = [req.body.accountnumber]

        let { rows } = await connect.query(query, data)
        console.log(rows[0])

        query = `INSERT INTO 
        transactions (createdon, cashier, t_accountnumber, transactiontype, amount, oldbalance, newbalance)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;

        let balance = Number(rows[0]) - Number(req.body.amount)

        const values = [
            new Date(),
            req.body.cashier,
            req.params.accountnumber,
            'debit',
            req.body.amount,
            rows.newbalance,
            balance
        ];

        try {
            const { rows } = await connect.query(query, values);
            return res.status(201).send(rows[0]);
        } catch (error) {
            return res.status(400).send('The action could not be completed');
        }
    }

    static async getAll(req, res) {
        const query = 'SELECT * FROM transactions';
        try {
            const { rows, rowCount } = await connect.query(query);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send('The action could not be completed');
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
            return res.status(400).send('The action could not be completed')
        }
    }

}

export default TransactionsController;
