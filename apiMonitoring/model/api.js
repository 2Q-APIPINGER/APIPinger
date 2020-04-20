var pool = require('./connectDB');

module.exports = {
    insertApi:(url,method,header,body) =>{
        var sql = "INSERT INTO api (url,method,header,body) VALUES ('"+url+"','"+method+"','"+header+"','"+body+"')";
        pool.query(sql,(error,results) =>{
            if(error){
                throw error;
            }
            return results;
        })
    },
    getApi:()=>{
        var sql = "SELECT * FROM api";
        pool.query(sql,(error,results) =>{
            if(error){
                throw error;
            }
            return results;
        })
    }
}