var database = require('./connectDB');

module.exports = {
    async insertCollection(name){
        try{
            const readAllQuery = "insert into testcase(casetest,cycle) values('"+name+"','"+0+"')";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getCollection(){
        try{
            const readAllQuery = 'SELECT * FROM testcase';
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async remove(casetest){
        try{
            const readAllQuery = "DELETE FROM testcase WHERE casetest = '"+casetest+"'";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }
}