var db_connect = require('./connectDB');

module.exports = {
    insertApi:(url,method,header,body) =>{
        console.log(url +": " + method +" : " + header + " : "+body);
        var query = "INSERT INTO api (url,method,header,body) VALUES ('"+url+"','"+method+"','"+header+"','"+body+"')";
        return db_connect.load(query);
    },
    getApi:()=>{
        var query = "SELECT * FROM api";
		return db_connect.load(query);
    }
}