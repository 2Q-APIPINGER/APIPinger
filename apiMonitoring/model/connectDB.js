const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "apimonitoring",
    password: "quan1997",
    port: "5432"
})

module.exports = pool;
