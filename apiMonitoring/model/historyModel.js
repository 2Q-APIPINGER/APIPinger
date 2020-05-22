var database = require('./connectDB');

module.exports={
    async listHistory(){
        try{
            const readAllQuery = 'SELECT * FROM api';
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