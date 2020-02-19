import pg, { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

/*const pool = new Pool({

    connectionString: process.env.NODE_ENV === "test" ? '' : 'postgres://zoauqrnnpxjhwu:1d091e53eab999b06e3ad29709c091ba4b5ddf16deece74f5f2e2ff4e922ec6b@ec2-54-80-184-43.compute-1.amazonaws.com:5432/d23f45l9llhci2'


    /* host: 'ec2-54-80-184-43.compute-1.amazonaws.com',
     user: 'zoauqrnnpxjhwu',
     database: 'd23f45l9llhci2',
     password: '1d091e53eab999b06e3ad29709c091ba4b5ddf16deece74f5f2e2ff4e922ec6b',
     port: 5432,
     max: 10,
     idleTimeoutMillis: 60000
})

/*export async function connect() {
    return await pool.connect();
} */

class Db {
    constructor() {
        this.pool = new Pool({
            connectionString: 'postgres://zoauqrnnpxjhwu:1d091e53eab999b06e3ad29709c091ba4b5ddf16deece74f5f2e2ff4e922ec6b@ec2-54-80-184-43.compute-1.amazonaws.com:5432/d23f45l9llhci2'
        })

        // this.pool.query('Select Now()', (err, res) => {
        //     console.log(err, res)
        //     pool.end()
        // })

        //      console.log('testing', this.pool)
        //      this.connect = async () => await this.pool.connect();
        //     this.connect = pg.connect('postgres://zoauqrnnpxjhwu:1d091e53eab999b06e3ad29709c091ba4b5ddf16deece74f5f2e2ff4e922ec6b@ec2-54-80-184-43.compute-1.amazonaws.com:5432/d23f45l9llhci2')
    }

    static async query(sql, data = []) {
        const conn = await this.pool;
        try {
            if (data.length) {
                return await conn.query(sql, data);
            }
            return await conn.query(sql);
        } catch (error) {
            return error
        } finally {
            // conn.end();
        }
    }

}

export default Db 