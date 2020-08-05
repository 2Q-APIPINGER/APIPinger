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
            return { rows };
        }catch(error){
            return error;
        }
    },
    async remove(casetest, userid){
        try{
            const readAllQuery = "DELETE FROM api WHERE casetest = '"+casetest+"'"+ "and userid = '"+userid+"'";
            const { rows } = await database(readAllQuery); 
           // console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async insertExpectedResult(result, url, method, header, body){
        try{
            const readAllQuery = "insert into expectedresult (result,urlapi,methodapi,headerapi,bodyapi) values ('"+result+"','"+url+"','"+method+"','"+header+"','"+body+"')";
            const { rows } = await database(readAllQuery);
          
            return { rows };
        }catch(error){
            return error;
        }
    },
    async getExpectedResult(url, method, header, body){
        try{
            const readAllQuery = "select result from expectedresult where urlapi = '" +url+"'and methodapi='"+method+"'and headerapi='"+header+"'and bodyapi='"+body+"'";
            const { rows } = await database(readAllQuery);
           // console.log(readAllQuery);
            return { rows };
        }catch(error){
            return error;
        }
    },
    async getApiMatch(url, method, header, body){
        try{
            const readAllQuery = "select id from api where url='" +url+"'and method='" +method + "'and header='" + header+"'and body='" +body+"'";
            const { rows } = await database(readAllQuery);
          
            return { rows };
        }catch(error){
            return error;
        }
    },
    async getBodyApiById(id){
        try{
            const readAllQuery = "SELECT body FROM api WHERE id="+id;
            const { rows } = await database(readAllQuery);
           // console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
}