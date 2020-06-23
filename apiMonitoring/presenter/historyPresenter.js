var history = require('../model/historyModel');

module.exports={
    historyApi:(req,res)=>{
        
        var userid = req.cookies.userId;      
        if(!userid)
        {
            userid="";
        }        
        var listHis = history.listHistory(userid);         
        console.log(listHis);
        listHis.then(rows=>{          
            res.json(rows);
        })          
    },
    lineHistory:(req,res)=>{
        let id  = req.query.value;
        console.log("id: "+ id);
        var lineHis = history.getOneLineHistory(id);
        console.log("his: " + lineHis);
        lineHis.then(rows=>{
            res.json(rows);
        })
    }
};

