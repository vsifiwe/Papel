import jwt from 'jsonwebtoken';
import connect from '../middleware/connect';

class Validate {

    static async verifyToken(req, res, next) {
        const token = req.get('x-access-token')
        if (!token) {
            return res.status(400).send({ 'message': 'Please provide a token' });
        }
        try {
            const decoded = jwt.decode(token, { complete: true });
            const userid = decoded.payload.userId
            const query = 'SELECT * FROM users WHERE userid = $1';
            const data = [
                userid
            ]
            const { rows } = await connect.query(query, data);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'This token does not exist' });
            }
            next();
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Validate;