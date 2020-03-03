import jwt from 'jsonwebtoken';
import connect from '../middleware/connect';

class Validate {

    static async verifyToken(req, res, next) {
        const token = req.headers['Authorization']
        // const token = req.get('Authorization')
        if (!token) {
            // return res.send({ 'message': 'Please provide a token' });
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
                // return res.send({ 'message': 'No bank accounts linked with this email' });
            }
            next();
        } catch (error) {
            // return res.send(error);
        }
    }
}

export default Validate;