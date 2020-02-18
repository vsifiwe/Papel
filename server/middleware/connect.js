import { Pool } from 'pg';
const pool = new Pool({
    host: '@ec2-54-80-184-43.compute-1.amazonaws.com',
    user: 'zoauqrnnpxjhwu',
    database: 'd23f45l9llhci2',
    password: '1d091e53eab999b06e3ad29709c091ba4b5ddf16deece74f5f2e2ff4e922ec6b',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
})

export function get_connection() {
    return pool
}