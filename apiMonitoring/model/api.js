var database = require('./connectDB');

module.exports = {
    async insertApi(url,method,header,body,file,userid,time){
        try{
            const readAllQuery = "insert into api (url,method,header,body,file,userid,time) values ('"+url+"','"+method+"','"+header+"','"+body+"','"+file+"','"+userid+"','"+time+"')";
            //const readAllQuery = "insert into api (url,method,header,body) values ('"+url+"','"+method+"','"+header+"','"+body+"')";
            //console.log("luu vo db: "+ readAllQuery);
            const { rows } = await database(readAllQuery);
           // console.log("chuoi row: " + JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getApi(){
        try{
            const readAllQuery = 'SELECT * FROM api';
            const { rows } = await database(readAllQuery);
           // console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getApiWithCollection(collection){
        try{
            const readAllQuery = "SELECT * FROM api WHERE casetest = '" + collection +"'";
            const { rows } = await database(readAllQuery);
           // console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async InsertInfOfFileSaveInDriveA(infoOfFile, id){
        try{
            const readAllQuery = "UPDATE api SET infofile= '" +infoOfFile + "' WHERE id='" +id + "'";
            //const readAllQuery = "insert into api (url,method,header,body) values ('"+url+"','"+method+"','"+header+"','"+body+"')";
            console.log("luu vo db: "+ readAllQuery);
            const { rows } = await database(readAllQuery);
           // console.log("chuoi row: " + JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getInfoFileById(id){
        try{
            const readAllQuery = "SELECT infofile FROM api WHERE id = '" + id +"'";
            const { rows } = await database(readAllQuery);
           // console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }
}