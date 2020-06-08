var api = require('../model/api');

module.exports = {
    collectionDetail: function(req,res,next){
        var casetest = req.params.casetest;
        console.log(casetest);
        api.getApi().then(data =>{
            let apiList = [];
            apiList = data.rows;
            for(let i=0; i<apiList.length; i++){
                if(apiList[i].casetest != casetest){
                    apiList.splice(i,1);
                }
            }
            res.render('runCollection',{apiList});
        })
    }
}