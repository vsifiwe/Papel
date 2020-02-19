import uuidv4 from 'uuid/v4';
import connect from '../middleware/connect';

class AccountsController {

    static async getAllAccounts(req, res) {
        const query = 'SELECT * FROM accounts';
        try {
            const { rows, rowCount } = await connect.query(query);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async getAccountTransactions(req, res) {
        const query = 'select * from transactions where t_accountnumber = $1';
        try {
            const { rows } = await connect.query(query, [req.params.accountnumber]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'no transactions found' });
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    static async getAccountDetails(req, res) {
        const query = 'select a.createdon, a.accountnumber, u.email, a.a_type, a.status, a.balance from accounts a, users u where a.owner=u.u_id and a.accountnumber = $1'
        try {
            const { rows } = await connect.query(query, [req.params.accountnumber]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'no Account Details found' });
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    }

}

export default AccountsController
