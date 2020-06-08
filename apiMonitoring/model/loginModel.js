var database = require('./connectDB');

module.exports={
    async registerAcc(username, pass, email, firstname, lastname, id){
        try{
            const readAllQuery = "INSERT INTO account(username, password, email, firstname, lastname, id) values('"+username+"','"+pass+"','"+email+"','"+firstname+"','"+lastname+"','"+id+"')";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getPass(username){
        try{
            const readAllQuery = "SELECT password FROM account WHERE username ='" + username +"'";
            //console.log(readAllQuery);
            const { rows }  = await database(readAllQuery);
            //console.log("abc:"+JSON.stringify({rows}));
            //console.log("abc:"+ {rows});
            return  { rows };
        }catch(error){
            return error;
        }
    },
    async checkId(Id){
        try{
            const readAllQuery = "SELECT id FROM account WHERE id='"+ Id + "'";
            const {rows} = await database(readAllQuery);
            return { rows };
        }catch(error){
            return error;
        }
    },
    async getID(username){
        try{
            const readAllQuery = "SELECT id FROM account WHERE username='"+ username + "'";
            const {rows} = await database(readAllQuery);
            return { rows };
        }catch(error){
            return error;
        }
    },
    async getUser(id){
        try{
            const readAllQuery = "SELECT * FROM account WHERE id='"+ id + "'";
            const {rows} = await database(readAllQuery);
            return { rows };
        }catch(error){
            return error;
        }
    }
}