var database = require('./connectDB');

module.exports={
    async listHistory(){
        // var sql = "SELECT * FROM api";
        // pool.query(sql,(err, rlt)=>{
        //     if(err){
        //         console.log("abc");
        //     }
        //     var temp = JSON.stringify(rlt);
        //     var temp1 = JSON.parse(temp)
        //     //console.log("kq:" + temp1.rows[2].url);
        //     console.log("kq:" + rlt);
        //     return rlt;
            
        // });
        try{
            const readAllQuery = 'SELECT * FROM api';
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }
}