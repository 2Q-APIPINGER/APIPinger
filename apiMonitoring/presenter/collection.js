var api = require('../model/api');
var collection = require('../model/collection');

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
    },
    run: function(req,res,next){
        res.render('collectionResult');
    },
    remove: function(req,res,next){
        var casetest = req.params.casetest;
        console.log(casetest);
        collection.remove(casetest);
        res.redirect('/');
    },
    saveApiToCollection: function(req,res,next){
        let nameCollection = req.query.value1;
        let idApi = req.query.value2;
        if(idApi == "")
        {
            collection.SetCollectionToNewestApi(nameCollection);
        }
        else{
           collection.SetCollectionToAvailableApi(nameCollection,idApi);
       }
    }
}