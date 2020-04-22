var history = require('../model/historyModel');

module.exports={
    historyApi:(req,res)=>{
        var listHis = history.listHistory();     
        listHis.then(rows=>{
            res.json(rows);
        })
          
    }
};