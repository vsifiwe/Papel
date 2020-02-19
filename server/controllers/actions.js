
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
        const query = "SELECT * FROM users WHERE email like $1";
        const values = [
            req.body.email
        ]
        try {
            const { rows } = await connect.query(query, values);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'Create an account to log in' });
            }
            if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }

            return res.status(200).send({ rows, token });
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

export default ActionControllers;
