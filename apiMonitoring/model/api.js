var database = require('./connectDB');

module.exports = {
    async insertApi(url,method,header,body,file,userid,time,casetest){
        try{
            const readAllQuery = "insert into api (url,method,header,body,file,userid,time,casetest) values ('"+url+"','"+method+"','"+header+"','"+body+"','"+file+"','"+userid+"','"+time+"','"+casetest+"')";
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
    }
}