var mysql = require('mysql');
var createConnection = ()=> {
    return mysql.createConnection({
        host: "ec2-54-197-48-79.compute-1.amazonaws.com",
        user: "nnwvujvsemlghc",
        password: "39dcffac91ef0a699d2a145b6e3edd3f7edcab2302f9dfdc9e3103c052595fcc",
        database: "d292vtoqmnk7tf",
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