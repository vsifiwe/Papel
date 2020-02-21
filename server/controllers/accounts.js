import connect from '../middleware/connect';

class AccountsController {

    static async getAllAccounts(req, res) {

        let query;
        let values;

        if (!req.query.status) {
            query = 'SELECT * FROM accounts'
            values = []
        } else {
            query = "SELECT * FROM accounts where status like $1"
            values = [
                req.query.status
            ]
        }

        try {
            const { rows, rowCount } = await connect.query(query, values);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send('The action could not be completed');
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
            return res.status(400).send('The action could not be completed')
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
            return res.status(400).send('The action could not be completed')
        }
    }

}

export default AccountsController
