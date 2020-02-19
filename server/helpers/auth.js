class authHelper {
    static verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            req.token = bearerToken
            next()

        } else {
            res.json({ status: 404 })
        }
    }
}

export default authHelper