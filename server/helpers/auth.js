import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {

    static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }

    static comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }

    static isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    static hasNumber(name) {
        return /\d/.test(name);
    }

    static isValidPassword(password) {
        return /^[0-9a-zA-Z]+$/.test(password)
    }

    static generateToken(id) {
        const token = jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' });
        return token;
    }
}

export default Helper;
