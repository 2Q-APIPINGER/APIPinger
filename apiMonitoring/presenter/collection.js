var api = require('../model/api');
var collection = require('../model/collection');
var request = require('request');
let nodemailer = require('nodemailer');
let acc = require('../model/loginModel');
let ejs = require('ejs');
const fs = require('fs');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let eventEmail;
let id;

function doRequest(listApi){
    return new Promise( async function (resolve, reject){
        var requestAllApi = listApi.map(requestApi.bind(null));
        async function requestApi(api, index){
            console.log("API "+ JSON.stringify(api));
            let start = new Date();
            let header = JSON.parse(api.header);
            let formData = api.body;
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
                                api['status'] = "Unauthenticated"
                                break;
                            case 401:
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
function sendEmail(json, email){
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
        to: `${email}`, // email receiver
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
}
//drive
const readline = require('readline');
const {google} = require('googleapis');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const {Storage} = require('@google-cloud/storage');
var ggdriveModel = require('../model/googledriveModel');
const { ppid } = require('process');

const SCOPES = ['https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.metadata',
               'https://www.googleapis.com/auth/drive.metadata.readonly',
               'https://www.googleapis.com/auth/drive.photos.readonly',
               'https://www.googleapis.com/auth/drive.readonly'
              ];
const TOKEN_PATH = 'token.json';


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function authorize(credentials, callback, pathFile) {
    //console.log("co vo day");
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, pathFile);
      //callback(oAuth2Client,"1Yfl7Wvn5P0ZRwpKdzzHuJ1CHNWhqVm82");
    });
  }
  function authorizeForDownload(credentials, callback, fileId, nameFile, typeFile) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
        // jsonForm[nameFile] = {
        //   "key": nameFile,
        //   "value": fs.createReadStream("public/images/GGDrive/" + nameFile + "." + typeFile),
        //   "options": {
        //     "filename": nameFile,
        //     'contentType': mimeType
        //   }
        // }
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      //callback(oAuth2Client);
     
     callback(oAuth2Client,fileId, nameFile,typeFile);
    });
  }
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    console.log("auth1: " + JSON.stringify(auth));
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
  }


async function downloadFile(fileId, auth){
  const drive = google.drive({version: 'v3',auth});     
  // var done = "done"
   console.log("fileid: " + fileId);
   //listBuckets();
   const filePath = "public/images/GGDrive/photo4.png";
   var dest = fs.createWriteStream(filePath);
  return drive.files
  .get({fileId, alt: 'media'}, {responseType: 'stream'})
  .then(res => {
    return new Promise((resolve, reject) => {
      let progress = 0;

      res.data
        .on('end', () => {
          console.log('Done downloading file.');
          resolve(filePath);
        })
        .on('error', err => {
          console.error('Error downloading file.');
          reject(err);
        })
        .on('data', d => {
          progress += d.length;
          if (process.stdout.isTTY) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`Downloaded ${progress} bytes`);
          }
        })
        .pipe(dest);
    });
  });
}
//begin Quang
//download file from Owner Drive use for history and run collection
async function downloadFileFromOwnerDrive(auth, fileId, nameFile, mimeType){
  const drive = google.drive({version: 'v3',auth});     
 // var fileId = "1Yfl7Wvn5P0ZRwpKdzzHuJ1CHNWhqVm82";
  // var done = "done"
  //console.log("chay vo download");
   //listBuckets();
  const filePath = "public/images/GGDrive/" + nameFile + "." + mimeType;
 // const filePath = "public/images/GGDrive/photo100.png";
  var dest = fs.createWriteStream(filePath);
  return drive.files
  .get({fileId, alt: 'media'}, {responseType: 'stream'})
  .then(res => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      res.data
        .on('end', () => {
          console.log('Done downloading file.');
          resolve(filePath);
        })
        .on('error', err => {
          console.error('Error downloading file.');
          reject(err);
        })
        .on('data', d => {
          progress += d.length;
          if (process.stdout.isTTY) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`Downloaded ${progress} bytes`);
          }
        })
        .pipe(dest);
    });
  });
}
//end Quang

const targetFolderId = "14P3XI1Iot8IXYYTnypmOnXpEEJAwApJy";
let objFileSaveDB = {};
let fileIdofFileUploaded;
async function uploadFile(auth, pathFile){
  const drive = google.drive({version: 'v3',auth});     
  var nameFile = pathFile.slice(pathFile.lastIndexOf('/') + 1);
  var typeFile = nameFile.slice(nameFile.indexOf('.')+1);
  var mimeTypeFile;
  switch (typeFile)
  {
     case "jpg":{
         mimeTypeFile = "image/jpeg";
         break;
     }
     case "png":{
        mimeTypeFile = "image/png";
        break;
    }
    case "mp4":{
        mimeTypeFile = "video/mp4";
        break;
    }
    case "avi":{
        mimeTypeFile = "video/avi";
        break;
    }
    case "svg":{
        mimeTypeFile = "image/svg";
        break;
    }
    case "bmp":{
        mimeTypeFile = "image/bmp";
        break;
    }
  }
  var fileMetadata = {
    'name': nameFile,
    parents:[targetFolderId]
  };
  var media = {
    mimeType: mimeTypeFile,
    body: fs.createReadStream(pathFile)
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, fileId) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
        fileIdofFileUploaded = fileId.data.id;
      console.log('File Id: ', fileId.data.id);
      fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
       
        console.log("coi file id: " + fileIdofFileUploaded);
        authorizeForDownload(JSON.parse(content),downloadFileFromOwnerDrive,fileIdofFileUploaded,nameFile,typeFile);
      });
    }
  });
}


//end drive

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
        let email = req.cookies.email;
        var iteration = req.body.iteration;
        var delay = req.body.delay;
        var casetest = req.params.casetest;
        console.log(">>>>>>>>>" + iteration + ":" + delay + ":" + casetest + " event: "+ eventEmail);
        api.getApiWithCollection(casetest).then(data =>{
            let apiList = [];
            let apiResult = [];
            let passed = 0, failed = 0;
            apiList = data.rows;
            doRequest(apiList).then(result =>{
                apiResult = result;
                console.log(">>>>+++++ :" + JSON.stringify(result));
                if(eventEmail.includes("alert")){
                    let contentEmail = "<h2>Iteration 1: </h2>" + "<p>The API list is faulty: </p>";
                    let count = 1;
                    apiResult.forEach(element =>{
                        if(element.statusCode != 200){
                            contentEmail = contentEmail + 
                                            "<span>" + count + ": </span>"+
                                            "<span style = \" margin-left: 10px; color: rgb(238, 177, 11);\"> url: " + element.url + "</span>" + 
                                            "<span style = \" margin-left: 3px; color: green;\">, method: " + element.method + "</span>"+ 
                                            "<span style = \" margin-left: 3px; color: red;\">, statusCode: " + element.statusCode + "</span>"+ 
                                            "<span style = \" margin-left: 3px; color: dark;\">, status: " + element.status + "</span>" + "<br><hr>";
                            count++;
                        }
                    });
                    sendEmail(contentEmail, email);
                }
                if(eventEmail.includes("finish each iteration")){
                    let contentEmail = "<h2>Iteration 1: </h2>" + "<p>List of api</p>";
                    let count = 1;
                    apiResult.forEach(element =>{
                        contentEmail = contentEmail +
                                        "<span>" + count + "</span>"+
                                        "<span style = \" margin-left: 10px; color: rgb(238, 177, 11);\"> url: " + element.url + "</span>" + 
                                        "<span style = \" margin-left: 3px; color: green;\">, method: " + element.method + "</span>";
                                        if(element.statusCode == 200){
                                            contentEmail = contentEmail + "<span style = \" margin-left: 3px; color: blue;\">, statusCode: " + element.statusCode + "</span>";
                                        }
                                        else{
                                            contentEmail = contentEmail + "<span style = \" margin-left: 3px; color: red;\">, statusCode: " + element.statusCode + "</span>";
                                        }
                        contentEmail = contentEmail +
                                        "<span style = \" margin-left: 3px; color: dark;\">, status: " + element.status + "</span>"+
                                        "<br> <hr>";
                        count ++;
                    });
                    sendEmail(contentEmail, email);
                }
                res.render("collectionResult", {apiResult,iteration,delay, eventEmail});
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
        let userId = req.cookies.userId;
        console.log(casetest);
        collection.remove(casetest, userId);
        api.remove(casetest, userId);
        res.redirect('/');
    },
    exportJson: function(req,res){
        let data = req.query.json;
        let casetest = req.query.casetest;
        fs.writeFile('./report_'+casetest+'.json', data, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });
        res.json({});
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
        let data = req.query.data;
        console.log("url: "+ url + " data: "+ data);
        if(url){
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
                   // console.log("JSON IMPORT: "+ body);
                    let result = JSON.parse(body);
                    console.log("info: " + result.info);
                    let userId = req.cookies.userId;
                    let flag = false;
                    collection.getCollection(userId).then(data =>{
                        let listOfCollection = data.rows;
                        if(listOfCollection.filter(item => item.casetest == result.info.name).length == 0){
                            console.log("doesn't exist");
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
                                let formData = {};
                                let url;
                                element.request.header.forEach(item =>{
                                    header[item.key] = item.value;
                                })
                                if(element.request.body){
                                    url = element.request.url.raw;
                                    element.request.body.formdata.forEach(ele =>{
                                        //begin Quang
                                        var path =  ele.src.substring(ele.src.indexOf("/")+1);
                                        var nameFile = path.slice(path.lastIndexOf('/') + 1);
                                        var typeFile = nameFile.slice(nameFile.indexOf('.')+1);
                                        fs.readFile('credentials.json', (err, content) => {
                                            if (err) return console.log('Error loading client secret file:', err);
                                            // Authorize a client with credentials, then call the Google Drive API.
                                            authorize(JSON.parse(content), uploadFile,ele.src.substring(ele.src.indexOf("/")+1));
                                           
                                          });
                                        //end Quang
                                        formData[ele.key] = {
                                            "key" : ele.key,
                                            "value" : fs.createReadStream(ele.src.substring(ele.src.indexOf("/")+1)),
                                            "options" : {
                                                "filename": ele.src.substring(ele.src.lastIndexOf("/")+1),
                                                'contentType': ele.type
                                            }
                                        }
                                    })
                                }else {
                                    url = element.request.url;
                                }
                                api.insertApi(url, element.request.method.toLowerCase(), JSON.stringify(header),JSON.stringify(formData),'',userId,datetime, result.info.name)
                            });
                            res.json({});
                        }
                        else{
                            res.json({"message":"Collection " + file_content.info.name + " already exist."})
                        }
                    })
                }
            })
        }else{
            let file_content = JSON.parse(data);
            let userId = req.cookies.userId;
            collection.getCollection(userId).then(data =>{
                let listOfCollection = data.rows;
                if(listOfCollection.filter(item => item.casetest == file_content.info.name).length == 0){
                    console.log("doesn't exist");
                    collection.insertCollection(file_content.info.name, userId);
                    //time
                    var currentdate = new Date(); 
                    var datetime = currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + "   "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes();
                    file_content.item.forEach(element => {
                        let header = {};
                        let formData = {};
                        let url;
                        element.request.header.forEach(item =>{
                            header[item.key] = item.value;
                        });
                        if(element.request.body){
                            url = element.request.url.raw;
                            element.request.body.formdata.forEach(ele =>{
                                formData[ele.key] = {
                                    "key" : ele.key,
                                    "value" : fs.createReadStream(ele.src.substring(ele.src.indexOf("/")+1)),
                                    "options" : {
                                        "filename": ele.src.substring(ele.src.lastIndexOf("/")+1),
                                        'contentType': ele.type
                                    }
                                }
                            })
                        }else {
                            url = element.request.url;
                        }
                        api.insertApi(url, element.request.method.toLowerCase(), JSON.stringify(header),JSON.stringify(formData),'',userId,datetime, file_content.info.name)
                    });
                    res.json({});
                }else{
                    res.json({"message":"Collection " + file_content.info.name + " already exist."})
                }
                
            })
        }

    },
    eventEmail: function(req,res){
        eventEmail = req.query.eventEmail;
        console.log(eventEmail);
    },
    saveImgToDrive: function(req,res){
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), listFiles);
        });
    }
}