var con_db = require('./connectDB');

module.exports={
    listHistory:()=>{
        var query = "SELECT * FROM api";
        return con_db.load(query);
    }
}