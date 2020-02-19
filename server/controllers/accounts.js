import Db from '../middleware/connect'

class AccountsController {

    static getAllAccounts(req, res) {
        const sql = 'select * from accounts';
        Db.query(sql).then(response => {
            return res.json({ data: response })
        })
            .catch(error => console.log(error))
    }
    static getAccountTransactions(req, res) {
        const id = req.params.accountnumber;
        const data = [id];
        const sql = 'select * from transactions where t_accountnumber = $1';
        Db.query(sql, data).then(response => {
            return res.json({ data: response })
        }).catch(error => console.log(error))
    }
    static getAccountDetails(req, res) {
        const id = req.params.accountnumber;
        const data = [id];
        const sql = 'select a.createdon, a.accountnumber, u.email, a.a_type, a.status, a.balance from accounts a, users u where a.owner=u.u_id and a.accountnumber = $1'
        Db.query(sql, data).then(response => {
            return res.json({ data: response })
        }).catch(error => console.log(error))
    }

    static createUserAccount(req, res) {
        const sql = 'insert into accounts values ()'
    }

    static createBankAccount(req, res) {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const type = req.body.type
        const createdon = new Date()

        var data = [firstName, lastName, email, type, createdon]
        var sql = 'INSERT INTO accounts () VALUES ()'

    }


}


export default AccountsController

















// import { get_connection } from '../middleware/connect';
// const pool = get_connection();

// export function all_account_transactions(req, res) {
//     const accountnumber = req.params.accountnumber;
//     pool.connect((err, client, done) => {
//         const query = "select * from transactions where t_accountnumber ='" + accountnumber + "'";
//         client.query(query, (error, result) => {
//             done();
//             if (error) {
//                 res.status(400).json({ error })
//             }
//             if (result.rows < '1') {
//                 res.status(404).send({
//                     status: '404',
//                 });
//             } else {
//                 res.status(200).send({
//                     status: '200',
//                     data: result.rows,
//                 });
//             }
//         });
//     });
// }

// // finish writing this query

// export function all_accounts(req, res) {
//     pool.connect((err, client, done) => {
//         const query = "select a.createdon, a.accountnumber, u.email, a.a_type, a.status, a.balance from accounts a, users u where a.owner=u.u_id;";
//         client.query(query, (error, result) => {
//             done();
//             if (error) {
//                 res.status(400).json({ error })
//             }
//             if (result.rows < '1') {
//                 res.status(404).send({
//                     status: '404',
//                 });
//             } else {
//                 res.status(200).send({
//                     status: '200',
//                     data: result.rows,
//                 });
//             }
//         });
//     })

// }

// export function specific_account_details(req, res) {
//     const accountnumber = req.params.accountnumber;
//     pool.connect((err, client, done) => {
//         const query = "select a.createdon, a.accountnumber, u.email, a.a_type, a.status, a.balance from accounts a, users u where a.owner=u.u_id and a.accountnumber = '" + accountnumber + "';";
//         client.query(query, (error, result) => {
//             done();
//             if (error) {
//                 res.status(400).json({ error })
//             }
//             if (result.rows < '1') {
//                 res.status(404).send({
//                     status: '404',
//                 });
//             } else {
//                 res.status(200).send({
//                     status: '200',
//                     data: result.rows,
//                 });
//             }
//         });
//     })

// }
