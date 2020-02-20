import connect from '../middleware/connect';

class UsersControllers {

    static async getUserAccounts(req, res) {
        const query = 'select * from accounts where owner = (select u_id from users where email like $1';

        try {
            const { rows } = await connect.query(query, [req.params.email]);
            return res.status(201).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

}

export default UsersControllers;
