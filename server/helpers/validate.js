import jwt from 'jsonwebtoken';
import connect from '../middleware/connect';

class Validate {

    static async verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await connect.query(text, [decoded.userid]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'This token does not exist' });
            }
            req.user = { id: decoded.userId };
            next();
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Validate;