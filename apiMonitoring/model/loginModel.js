var database = require('./connectDB');

module.exports={
    async registerAcc(username, pass, email, firstname, lastname){
        try{
            const readAllQuery = "INSERT INTO account(username, password, email, firstname, lastname) values('"+username+"','"+pass+"','"+email+"','"+firstname+"','"+lastname+"')";
            const { rows } = await database(readAllQuery);
            //console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }

}