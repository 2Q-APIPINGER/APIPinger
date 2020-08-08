const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "apipinger",
    password: "quan1997",
    port: "5432"
})
function query(text) {
    return new Promise((resolve, reject) => {
      pool
        .query(text)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
module.exports = query;
