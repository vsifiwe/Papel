
import connect from '../middleware/connect';
import Helper from '../helpers/auth';

class ActionControllers {

    static async signUp(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Enter both email and password correctly' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email' });
        }
        if (!Helper.isValidPassword(req.body.password)) {
            return res.status(400).send({ 'message': 'Please enter a valid password' })
        }

        if (Helper.hasNumber(req.body.firstname) || Helper.hasNumber(req.body.lastname)) {
            return res.status(400).send({ 'message': 'First Name or Last Name must not contain numbers' })
        }
        const hashPassword = Helper.hashPassword(req.body.password)

        const query = `INSERT INTO
        users( email, password, firstname, lastname, type, isadmin)
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;
        const values = [
            req.body.email,
            hashPassword,
            req.body.firstname,
            req.body.lastname,
            req.body.type,
            req.body.isadmin
        ];

        try {
            const { rows } = await connect.query(query, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({ token, rows });
        } catch (error) {
            if (error) {
                return res.status(400).send({ 'message': error })
            }
            return res.status(400).send(error);
        }
    }

    static async signIn(req, res) {

        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Enter both email and password correctly' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email' });
        }
        if (!Helper.isValidPassword(req.body.password)) {
            return res.status(400).send({ 'message': 'Please enter a valid password' })
        }
        const query = "SELECT * FROM users WHERE email like $1 ";
        const values = [
            req.body.email
        ]
        try {
            const { rows } = await connect.query(query, values);

            if (!rows[0]) {
                return res.status(400).send({ 'message': 'Create an account to log in' });
            }
            if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided are incorrect' });
            }
            const token = Helper.generateToken(rows[0].userid)
            return res.status(200).send({ token, rows });
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    static async createBankAccount(req, res) {

        if (!req.body.owner || !req.body.type || !req.body.status) {
            return res.status(400).send({ 'message': 'Check entered details' });
        }

        const query = `INSERT INTO
        accounts( createdon, owner, accounttype, status)
        VALUES ($1, $2, $3, $4) returning *`;
        const values = [
            new Date(),
            req.body.owner,
            req.body.type,
            req.body.status
        ];

        try {
            const { rows } = await connect.query(query, values);
            return res.status(201).send({ rows });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async setNewStatus(req, res) {

        if (!req.params.accountnumber) {
            return res.status(400).send({ 'message': 'Check entered account number' });
        }

        const query = `UPDATE accounts SET status = $1 where accountnumber = $2 returning *`;
        const values = [
            req.body.status,
            req.params.accountnumber
        ];

        try {
            const { rows } = await connect.query(query, values);
            return res.status(201).send({ rows });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async deleteAccount(req, res) {

        if (!req.params.accountnumber) {
            return res.status(400).send({ 'message': 'Check entered account number' });
        }

        const query = `DELETE FROM accounts WHERE accountnumber = $1`;
        const values = [
            req.params.accountnumber
        ];

        try {
            await connect.query(query, values);
            return res.status(201).send({ 'message': 'Account Successfully Deleted' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    static async DormantAccounts(req, res) {

        if (!req.params.status) {
            return res.status(400).send({ 'message': 'Check entered Status {active or dormant}' });
        }

        const query = `select * from accounts where status like $1 returning *`;
        const values = [
            req.params.status,
        ];

        try {
            const { rows } = await connect.query(query, values);
            return res.status(201).send({ rows });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default ActionControllers;
