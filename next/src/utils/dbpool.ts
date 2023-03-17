import { Pool } from 'pg'
 
console.log('DEBUT NEW POOL')

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

console.log('FIN NEW POOL')

export default function getPool() {
    console.log('FN GET POOL')
    return pool;
}
