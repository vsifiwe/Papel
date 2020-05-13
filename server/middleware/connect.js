import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: 'postgressql://postgres:shyoko@127.0.0.1:49816/api',
    // ssl: true,
    // rejectUnauthorized: false,
});
if (pool) {
    console.log("goooooo");
} else {
    console.log("noooooo");
}

export default {

    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);

                })
        })
    }
}
