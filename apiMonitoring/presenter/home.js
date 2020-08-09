var express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
let buffer = require('buffer');
var request = require('request');
var apiDB = require('../model/api');
var collectionDB = require('../model/collection');
var history = require('../model/historyModel');
// var axios = require('axios');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let jsonForm = {};
let jsonFormHeader = {};
let listKeyFile = [];
let idAPI, eventCallAPI;

//begin Quang
let saveResult = {};
let saveMethod = "";
let saveApi = "";
let saveHeader = {};
let saveBody = {};
let listFileDrive = {};
let listFileGetFromDrive = {};//list file get from drive use to run api for history or collection
let tempidOfApi;
//end Quang
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

function authorize(credentials, callback) {
    //console.log("co vo day");
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
      //callback(oAuth2Client,"1Yfl7Wvn5P0ZRwpKdzzHuJ1CHNWhqVm82");
    });
  }
  function authorizeForDownload(credentials, callback, fileId, nameFile, typeFile ,mimeType) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
        jsonForm[nameFile] = {
          "key": nameFile,
          "value": fs.createReadStream("public/images/GGDrive/" + nameFile + "." + typeFile),
          "options": {
            "filename": nameFile,
            'contentType': mimeType
          }
        }
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      //callback(oAuth2Client);
     
     callback(oAuth2Client,fileId, nameFile,typeFile ,mimeType);
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
  console.log("chay vo download");
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
async function uploadFile(auth){
  const drive = google.drive({version: 'v3',auth});     
  let nextIdApi;
  ggdriveModel.getNextIdApi().then(data=>{
    nextIdApi = data.rows;
    for(posId in nextIdApi)
    {
      let arrName = [];
      let arrMimetype = [];
      let flag = 0;
      let flag1 = 0;
      for(posFile in listFileDrive)
      {
        arrName.push(listFileDrive[posFile].nameFile);
        arrMimetype.push(listFileDrive[posFile].mimeType);
        console.log("in mimetype: " + arrMimetype);
        var fileMetadata = {
          'name': listFileDrive[posFile].nameFile + "-of-" + nextIdApi[posId].max,
          parents:[targetFolderId]
        };
        var media = {
          mimeType: listFileDrive[posFile].mimeType,
          body: fs.createReadStream(listFileDrive[posFile].path)
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
            objFileSaveDB[arrName[flag]] = {
              "nameFile" : arrName[flag],
              "fileId" : fileId.data.id,
              "mimeType" : arrMimetype[flag]
            };
            console.log("flag: " + flag);
            console.log("mimetype: " + arrMimetype[flag]);
            if(flag == flag1 -1)
            {
              console.log("obj ne: " + JSON.stringify(objFileSaveDB));
              apiDB.InsertInfOfFileSaveInDriveA(JSON.stringify(objFileSaveDB),nextIdApi[posId].max);
            }
            flag = flag + 1;             
          }        
        });      
        flag1 = flag1 + 1;
      }  
    }   
  }) 
  objFileSaveDB = {};
  listFileDrive = {};
}


//end drive

let home = {

    get: function (req, res, next) {
        let rs = {};
        let url = "";
        let api,method,header,body;
        var userId = req.cookies.userId;
        collectionDB.getCollection(userId).then(data=>{
          rs.listCollection = [];
          rs.listCollection = data.rows;
          apiDB.getApi(userId).then( dt =>{
            rs.listApi = [];
            rs.listApi = dt.rows;
            console.log( "listcollection: " + JSON.stringify(rs.listCollection));
            res.render('index', { rs, url, api , method, body,header});
          })
          
        });
    },
    getCollectionById: function(req,res,next){
      let rs = {};
      var id = req.cookies.userId;
      collectionDB.getCollectionByUserId(id).then(data=>{
          rs.listCollectionId = [];
          rs.listCollectionId = data.rows;
          res.render('index', {rs});
      })
  },
    postImg: function (req, res, next) {
        //console.log("file ", file);
        let rs = {};
        let url = "";
        file = req.file;
        //console.log("file ", file);
        res.redirect('/home');
    },
    getId: function(req, res, next) {
      idAPI = req.query.id;
      console.log("id of api>>>>>"+ idAPI);
      eventCallAPI = "";
    },
    getEvent: function(req, res, next){
      eventCallAPI = req.query.eventCallApi;
      console.log("event: "+ eventCallAPI);
    },
    getValue : function(req,res,next){
      let numberLine = req.query.value1;
        if(numberLine){
          let type = req.query.value2;
          let key = req.query.value3;//name of value
          let value;
          //begin Quang
          let idOfApi = req.query.value4;
          tempidOfApi = idOfApi;
          let contentTypeOfFileDowned = req.query.value5; //contentype of file downloaded from gg drive
          //end Quang
          if(type == 'text'){
            value = req.query.value4;
            jsonForm[key] = {
              "key": key,
              "value": value,
              "options": {
                'contentType': 'text/html'
              }
            };
          }
          else{
            listKeyFile.push(key);
          }
        }
    },
    //get data header
    getValueHeader:function(req,res,next){
      let numberLine = req.query.value1;
      let name = req.query.value2;
      let value = req.query.value3;
      jsonFormHeader[name] = value;
      //console.log("header: " + JSON.stringify(jsonFormHeader));
     // console.log("getHeader: " + name + ":" + value);
    },
    //create collection
    createCollection :function(req,res,next){
      //document.getElementById("form-create-collection").style.display = "none";
      let userId = req.cookies.userId;
      let nameCollection = req.body.nameOfCollection;
      //console.log("name: " + nameCollection);
      collectionDB.getCollection(userId).then(data =>{
        let listOfCollection = data.rows;
        if(listOfCollection.filter(item => item.casetest == nameCollection).length == 0){
          collectionDB.insertCollection(nameCollection,userId);
        }
        res.json({"message":"Collection " + nameCollection + " already exist."});
      })
      
    },
   
    callApi: function (req, res, next) {
        let typeSubmit = req.body.submit;
        console.log("type submit: " + typeSubmit);
        var api = req.body.api;
        let data;
        let rs = {};
        let url = "";
        let method = req.body.method;
        let usernameBasicAuth = req.body.usernameBasicAuth;
        let passBasicAuth = req.body.passBasicAuth;
        let bearerToken = req.body.bearerToken;
        var idUser = req.cookies.userId; // cookies

        //time
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "   "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
        if(usernameBasicAuth){
          let data = usernameBasicAuth+":"+passBasicAuth;
          let encode = Buffer.from(data).toString('base64');
         // console.log(data + " -> " + encode);
          jsonFormHeader['Authorization'] = "basic "+ encode;
        }
        if(bearerToken){
          jsonFormHeader['Authorization'] = bearerToken;
        }
        var file = req.files;

        console.log("check xem co file k: " + file);

        
        if(eventCallAPI != "new")
        {
          console.log("file "+ JSON.stringify(file));
          console.log("header :"+ JSON.stringify(jsonFormHeader));
          console.log("form :"+ JSON.stringify(jsonForm));
          console.log("idAPI "+ idAPI);
          history.getOneLineHistory(idAPI).then(data =>{
            console.log("data>>" + JSON.stringify(data));
            let api = data.rows[0];
            console.log("api>>>" + JSON.stringify(api));
            let start = new Date();
            console.log("header api >>"+ api.header);
            let header = JSON.parse(api.header);
            let formData = JSON.parse(api.body);
            header['Content-Type'] = "multipart/form-data; boundary=--------------------------070917261639122214163647";
            let Options = {
                method: api.method,
                url: api.url,
                headers: header,
                formData: api.body
            };
            console.log("option auto: "+ JSON.stringify(Options));
            apiDB.insertApi(api.url,api.method,JSON.stringify(header),JSON.stringify(formData),JSON.stringify(file),idUser,datetime,'');
            request(Options, function (error, response,body) { 
              if (error){
                res.redirect('/home');
              };
             
              console.log("body>>>"+ body);
              let json;
              //console.log("json :"+ JSON.stringify(json));
              try{
                json = JSON.parse(body);
              }catch(err){
                json = body;
              }
              saveResult = body;
              //console.log("json :"+ JSON.stringify(json));
              rs.json = JSON.stringify(json);
              //begin Quang
              saveApi = api.url;
              saveMethod = api.method;
              saveHeader = header;
              saveBody = formData;
              apiDB.getExpectedResult(api.url, api.method,JSON.stringify(header),JSON.stringify(formData)).then(data=>{
                let idapi = data.rows;
                for(tempapi in idapi)
                {
                  rs.jsonExpect = idapi[tempapi].result;
                  break;
                  console.log("coi: " + idapi[tempapi].result);
                }
              });
              listKeyFile = [];
      
              //end Quang
              collectionDB.getCollection(idUser).then(data=>{
                //console.log("data "+ JSON.stringify(data));
                rs.listCollection = [];
                rs.listCollection = data.rows;
                apiDB.getApi(idUser).then( dt =>{
                  rs.listApi = [];
                  rs.listApi = dt.rows;
                  res.render('index', { rs, url , api, method});
                  //res.json(rs)
                })
              });
            });
          })
          
        }else {
          // add file for form
          for(let i=0; i<file.length; i++){
            jsonForm[listKeyFile[i]] = {
              "key": listKeyFile[i],
              "value": fs.createReadStream(file[i].path),
              "options": {
                "filename": file[i].filename,
                'contentType': file[i].mimetype
              }
            };
            listFileDrive[i] = {
              "nameFile" : listKeyFile[i],
              "path" : file[i].path,
              "mimeType" : file[i].mimetype
            }
          };
          //console.log("formData "+ JSON.stringify(jsonForm));
          jsonFormHeader['Content-Type'] = "multipart/form-data; boundary=--------------------------070917261639122214163647";

          //console.log("headers: "+ jsonFormHeader);
          var options = {
            method: method,
            url: api,
            headers: jsonFormHeader,
            formData:jsonForm
          };


          console.log("option:" + JSON.stringify(options));
          //console.log("form header:" + JSON.stringify(jsonFormHeader));
          // insert api
          if(!idUser)
          {
            idUser="";
          }
          apiDB.insertApi(api,method,JSON.stringify(jsonFormHeader),JSON.stringify(jsonForm),JSON.stringify(file),idUser,datetime,'');
          request(options, function (error, response,body) { 
              if (error){
                res.redirect('/home');
              };
            
              //console.log(response);
              let json;
              //console.log("json :"+ JSON.stringify(json));
              try{
                json = JSON.parse(body);
              }catch(err){
                json = body;
              }
              saveResult = body;
              //console.log("json :"+ JSON.stringify(json));
              rs.json = JSON.stringify(json);
              //begin Quang
              saveApi = api;
              saveMethod = method;
              saveHeader = jsonFormHeader;
              saveBody = jsonForm;
              apiDB.getExpectedResult(api,method,JSON.stringify(jsonFormHeader),JSON.stringify(jsonForm)).then(data=>{
                let idapi = data.rows;
                for(tempapi in idapi)
                {
                  rs.jsonExpect = idapi[tempapi].result;
                  break;
                  console.log("coi: " + idapi[tempapi].result);
                }
              });
              jsonFormHeader = {};
              jsonForm = {};
              listKeyFile = [];

              //end Quang
              collectionDB.getCollection(idUser).then(data=>{
                //console.log("data "+ JSON.stringify(data));
                rs.listCollection = [];
                rs.listCollection = data.rows;
                apiDB.getApi(idUser).then( dt =>{
                  rs.listApi = [];
                  rs.listApi = dt.rows;
                  res.render('index', { rs, url , api, method});
                  //res.json(rs)
                })
              });
          });

        }
        
    },

    //drive
    doWithGGDrive : function(req,res,next){
      fs.readFile('credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Drive API.
          authorize(JSON.parse(content), listFiles);
      });
  },
  downloadFileGGDrive : function(req,res,next){
    var fileId = req.query.value1;
    // var apikey = req.query.value2;
     var accessToken = req.query.value3;

     var bearerToken = req.query.value2;

    const oAuth2Client = new google.auth.OAuth2(
      "386173715180-c31v9a1vbcra2atvno75vk60ep46raah.apps.googleusercontent.com");

    oAuth2Client.setCredentials(bearerToken);

    console.log("abc: " +JSON.stringify(oAuth2Client));
    downloadFile(fileId,oAuth2Client).catch(console.error);


  },
  uploadFileToGGDrive: function(req,res,next){
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      console.log("co chay upload");
      authorize(JSON.parse(content), uploadFile);
  }); 
  },
    //end drive
    saveAsExpectedResult: function(req,res,next){
      let api = [];
      //console.log("coi thu: "+ saveResult +"," + saveApi+","+saveMethod+","+JSON.stringify(saveHeader)+","+JSON.stringify(saveBody))
      apiDB.insertExpectedResult(saveResult,saveApi,saveMethod,JSON.stringify(saveHeader),JSON.stringify(saveBody));
      
      saveResult = {};
      saveMethod = "";
      saveApi = "";
      saveHeader = {};
      saveBody = {};
       let obj = {result: "Saved!"};
       res.json(JSON.stringify(obj));
    }
}
module.exports = home;


