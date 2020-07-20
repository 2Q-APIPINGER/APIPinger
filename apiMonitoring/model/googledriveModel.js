var database = require('./connectDB');

module.exports={
    async getNextIdApi(){
        try{
            const readAllQuery = "SELECT MAX(id) FROM api";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }
}