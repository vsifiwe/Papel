import Db from '../middleware/connect'
import jsonwebtoken from 'jsonwebtoken'
const jwt = jsonwebtoken

class ActionControllers {
    static createBankAccount(req, res) {
        createdon = new Date()
        owner = req.body.email
        a_type = req.body.a_type
        status = req.body.status
        balance = req.body.balance

        var data = [createdon, owner, a_type, status, balance]
        const sql = 'insert into accounts(createdon, owner, a_type,status, balance) values ($1, $2, $3, $4, $5)'
        Db.query(sql, data).then(res => {
            return res.json({ status: 200 })
        }).catch(error => console.log(error))
    }

    static signUp(req, res) {
        var token = req.token
        var firstName = req.body.firstname
        var lastName = req.body.lastname
        var email = req.body.email
        var password = req.body.password
        var type = req.body.type
        var isadmin = req.body.isadmin

        var data = [token, firstName, lastName, email, password, type, isadmin]
        var sql = 'Insert into accounts (token,firstname,lastname,email,password,type,isadmin) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *'

        Db.query(sql, data).then(response => {
            console.log(response)
            return res.json({ response })
        }).catch(error => console.log(error))
    }

    static keyGenerate(req, res) {
        jwt.sign(req.body, 'example', (err, token) => {
            res.json({ token: token })
        })
    }

    static signIn(req, res) {
        jwt.verify(req.token, 'example', (err, authData) => {
            if (err) {
                return res.json({ status: 400 })
            } else {
                return res.json({ status: 200, authData })
            }
        })

    }
}

export default ActionControllers;

