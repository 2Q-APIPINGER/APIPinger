var database = require('./connectDB');

module.exports={
    async listHistory(userid){
        try{
            const readAllQuery = "SELECT * FROM api WHERE userid = '" + userid+"'";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getOneLineHistory(id){
        try{
            const readAllQuery = 'SELECT * FROM api WHERE id =' + id;
            const { rows } = await database(readAllQuery);
            console.log(JSON.stringify({rows}));
            return { rows };
        }catch(error){
            return error;
        }
    }

}