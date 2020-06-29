var api = require('../model/api');
var collection = require('../model/collection');
var request = require('request');
let nodemailer = require('nodemailer');
let acc = require('../model/loginModel');
let ejs = require('ejs');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function doRequest(listApi){
    return new Promise( async function (resolve, reject){
        var requestAllApi = listApi.map(requestApi.bind(null));
        async function requestApi(api, index){
            console.log("API "+ JSON.stringify(api));
            let start = new Date();
            let header = JSON.parse(api.header);
            let formData = JSON.parse(api.body);
            header['Content-Type'] = "multipart/form-data; boundary=--------------------------070917261639122214163647";
            let options = {
                method: api.method,
                url: api.url,
                headers: header,
                formData: formData
            };
            return new Promise (function (resolve, reject) {
                request(options,function (error, response,body){
                    if(!error){
                        api['statusCode'] = response.statusCode;
                        switch (response.statusCode) {
                            case 200:
                                api['status'] = "Ok"
                                break;
                            case 500:
                                api['status'] = "Internal Server Error"
                                break;
                            case 501:
                                api['status'] = "Not Implemented"
                                break;
                            case 404:
                                api['status'] = "Not Found"
                                break;
                            case 400:
                                api['status'] = "Bad Request"
                                break;
                            default:
                                break;
                        }
                        api['timeRequest'] = new Date() - start;
                        return resolve(api);
                    }else{
                        reject(error);
                    }
                })
            })
        }
        return await Promise.all(requestAllApi).then( function(result) {
            console.log("result all "+ JSON.stringify(result));
            return resolve(result);
        })
    });
}
function runIteration(req){
    return new Promise(function(resolve,reject){
        console.log("iteration "+ JSON.stringify(req));
        return resolve(req);
    })
    
}
module.exports = {
    collectionDetail: function(req,res,next){
        var casetest = req.params.casetest;
        console.log(casetest);
        api.getApiWithCollection(casetest).then(data =>{
            let apiList = [];
            apiList = data.rows;
            res.render('runCollection',{apiList});
        })
    },
    run: function(req,res,next){
        //res.render("collectionResult");
        var iteration = req.body.iteration;
        var delay = req.body.delay;
        var casetest = req.params.casetest;
        console.log(">>>>>>>>>" + iteration + ":" + delay + ":" + casetest);
        api.getApiWithCollection(casetest).then(data =>{
            let apiList = [];
            let apiResult = [];
            let passed = 0, failed = 0;
            apiList = data.rows;
            doRequest(apiList).then(result =>{
                apiResult = result;
                console.log(">>>>+++++ :" + JSON.stringify(result));
                res.render("collectionResult", {apiResult,iteration,delay});
            })
            
        })
        //res.render('collectionResult');
    },
    runCollection: function(req,res){
        let casetest = req.query.casetest;
        console.log("???" + casetest);
        api.getApiWithCollection(casetest).then(data =>{
            let apiList = [];
            let apiResult = [];
            apiList = data.rows;
            doRequest(apiList).then(result =>{
                apiResult = result;
                console.log(JSON.stringify(apiResult));
                res.json(apiResult);
            })
        })
    },
    remove: function(req,res,next){
        var casetest = req.params.casetest;
        console.log(casetest);
        collection.remove(casetest);
        res.redirect('/');
    },
    exportJson: function(req,res){

    },
    sendEmail: function(req,res){
        let userId = req.cookies.userId;
        let json = req.query.json;
        console.log("json : "+ JSON.stringify(json));
        acc.getUser(userId).then(rs=>{
            let account = rs.rows[0];
            console.log(JSON.stringify(account));
            //let email = "phanducquan.1997@gmail.com";
            const output=`
            <h1 style="color: red">API-PINGER</h1>
            <hr>
            <p>Xin chào bạn, tôi là đại diện cho API-PINGER để gửi mail này cho bạn</p>
            <p>File json kết quả:</p>
            ${json}
            <p>Xin cảm ơn</p>
            `;
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'apipinger1111@gmail.com',
                    pass: 'admin.api.pinger.1111'
                }
            });
            let  mailOptions ={
                from: '"ApiPingerCenter" <foo@example.com>', // sender address
                to: `${account.email}`, // email receiver
                subject: `report pin api`, // Subject lineS
                text: 'Hello', // plain text body
                html: output, // html body
                //template: 'email'
            };
            transporter.sendMail(mailOptions,function (err,result) {
                if(err){
                    console.log("Lỗi mail: "+ err);
                }
                else {
                    console.log("mail sent: "+ result.response);
                    res.redirect("/home");
                    //res("mail was sent sucessfully"); // tạm gửi qua màn hình chính, chưa xử lý xong
                }
            });
        });
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
       res.redirect('/home');
    },
    import: function(req, res, next){
        let url = req.query.url;
        let start = new Date();
        let header = {};
        header['Content-Type'] = "multipart/form-data; boundary=--------------------------070917261639122214163647";
            let options = {
                method: 'GET',
                url: url,
                headers: header,
                formData: {}
        };
        request(options,function (error, response,body){
            if(error){
                console.log("err: "+ error);
            }
            else{
                console.log("JSON IMPORT: "+ body);
                let result = JSON.parse(response.body);
                console.log("info: " + result.info);
                let userId = req.cookies.userId;
                collection.insertCollection(result.info.name, userId);
                 //time
                var currentdate = new Date(); 
                var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + "   "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes();
                result.item.forEach(element => {
                    let header = {};
                    element.request.header.forEach(item =>{
                        header[item.key] = item.value;
                    })
                    api.insertApi(element.request.url, element.request.method, JSON.stringify(header),'{}','',userId,datetime, result.info.name)
                });
                res.redirect('/home');
            }
        })

    }
}