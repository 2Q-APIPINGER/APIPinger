var database = require('./connectDB');

module.exports = {
    async insertApi(url,method,header,body){
        try{
            const readAllQuery = "insert into api (url,method,header,body) values ('"+url+"','"+method+"','"+header+"','"+body+"')";
            console.log(readAllQuery);
            const { rows } = await database(readAllQuery);
            console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    },
    async getApi(){
        try{
            const readAllQuery = 'SELECT * FROM api';
            const { rows } = await database(readAllQuery);
            console.log(JSON.stringify({rows}));
            return { rows };
        } catch (error) {
            return error;
        }
    }
}