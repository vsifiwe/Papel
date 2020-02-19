import Db from '../middleware/connect'

class UsersControllers {
    static getUserAccounts(req, res) {
        const id = req.params.email
        const data = [id]
        const sql = 'select * from accounts where owner = (select u_id from users where email like $1'

        Db.query(sql, data).then(response => {
            return res.json({ data: response })
        }).catch(error => console.log(error))
    }
}

export default UsersControllers


























// import { get_connection } from '../middleware/connect';
// const pool = get_connection();

// export function all_account_email(req, res) {
//     const email = req.params.email;
//     pool.connect((err, client, done) => {
//         const query = "select * from accounts where owner = (select u_id from users where email like '" + email + "');";
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

// export default all_account_email;