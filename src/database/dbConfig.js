require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    allowExitOnIdle: true
})

const initDB = async () => {

    await database.query(
        `
         CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL, 
            password VARCHAR(255) NOT NULL, 
            role VARCHAR(15) CHECK(role IN ('customer', 'admin', 'guest')) NOT NULL DEFAULT customer
         );
        `
    )
}

const cleanDB = async () => {
    await database.query('DELETE FROM usuarios;')
}

module.exports = {
    database,
    initDB,
    cleanDB
};