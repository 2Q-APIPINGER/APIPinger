var pool = require('./connectDB');

module.exports = {
    insertCollection:(name)=>{
        let sql = "insert into testcase(casetest,cycle) values('"+name+"','"+0+"')";
        pool.query(sql,(error,results) =>{
            if(error){
                throw error;
            }
            return results;
        })
    }
}