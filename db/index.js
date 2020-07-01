const { Pool } = require("pg");

let pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

if (process.env.NODE_ENV === "production") {
    pool = new Pool(
        {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
    );
}

module.exports = {
    query: (text, parameters) => pool.query(text, parameters)
};