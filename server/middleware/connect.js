import { Pool } from 'pg';
const pool = new Pool({
    user: 'manzi',
    database: 'api',
    password: 'hello',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
})

export function get_connection() {
    return pool
}