var history = require('../model/historyModel');

module.exports={
    historyApi:(req,res)=>{
        // let temp = req.query.value;
        // console.log("gia tri la: " + temp);
        var listHis = history.listHistory();     
        //var listHis = apiDB.getApi();
        //console.log(history);
        console.log(listHis);
        listHis.then(rows=>{          
            res.json(rows);
        })
          
    }
};