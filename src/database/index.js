import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

export const pool = await mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export const testConnection = async() => {
    try {
        await pool.query('select 1')
        console.log('conexion exitosa')
    } catch (error) {
        console.log('error al conectar la base de datos',error)
    }
}