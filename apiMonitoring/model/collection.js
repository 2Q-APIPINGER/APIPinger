var database = require('./connectDB');

module.exports = {
    async insertCollection(name,userid){
        try{
            const readAllQuery = "insert into testcase(casetest,cycle, userid) values('"+name+"','"+ 0 + "','" + userid + "')";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }, 
    async getCollection(idUser){
        try{
            const readAllQuery = "SELECT * FROM testcase WHERE userid = '" + idUser+"'";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async remove(casetest, userid){
        try{
            const readAllQuery = "DELETE FROM testcase WHERE casetest = '"+casetest+"'"+ "and userid = '"+userid+"'";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getCollectionByUserId(id){
        try{
            const readAllQuery = "SELECT * FROM testcase WHERE userid = '" + id+"'";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        }catch(error){
            return error;
        }
    },
    async SetCollectionToNewestApi(nameCollection){
        try{
            const readAllQuery = "UPDATE api SET casetest ='"+nameCollection+"' WHERE id = (SELECT max(id) FROM api)";
            const {rows} = await database(readAllQuery);
            return {rows};
        }catch(error){
            return error;
        }
    },
    async SetCollectionToAvailableApi(nameCollection, id){
        try{
            const readAllQuery = "UPDATE api SET casetest ='"+nameCollection+"' WHERE id ="+id;
            const {rows} = await database(readAllQuery);
            return {rows};
        }catch(error){
            return error;
        }
    }
}