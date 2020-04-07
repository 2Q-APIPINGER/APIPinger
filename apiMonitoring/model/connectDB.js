var mysql = require('mysql');
var createConnection = ()=> {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "apimonitoring",
    });
}

module.exports={
	 load: sql =>{
        return new Promise((resolve, reject)=>{
            var connection = createConnection();
            connection.query(sql, (err, result, fields) => {
                if (err)
                    reject(err);
                else{
                    resolve(result);
                }
                connection.end();
            });
        })
    }
}