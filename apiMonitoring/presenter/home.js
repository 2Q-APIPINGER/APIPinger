var express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
let buffer = require('buffer');
var request = require('request');
var apiDB = require('../model/api');
var collectionDB = require('../model/collection');
// var axios = require('axios');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let jsonForm = {};
let jsonFormHeader = {};
let listKeyFile = [];

let home = {

    get: function (req, res, next) {
        let rs = {};
        let url = "";
         var id = req.cookies.userId;
        collectionDB.getCollection(id).then(data=>{
          rs.listCollection = [];
          rs.listCollection = data.rows;
          apiDB.getApi().then( dt =>{
            rs.listApi = [];
            rs.listApi = dt.rows;
            res.render('index', { rs, url });
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
        res.redirect('/');
    },
    getValue : function(req,res,next){
      let numberLine = req.query.value1;
        if(numberLine){
          let type = req.query.value2;
          let key = req.query.value3;//name of value
          let value;
          if(type == 'text'){
            value = req.query.value4;
            jsonForm[key] = {
              "key": key,
              "value": value,
              "options": {
                'contentType': 'text/html'
              }
            };
  //          console.log("key: "+ key + " type: "+ type + " value+ "+value);
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
      let nameCollection = req.body.nameOfCollection;
      //console.log("name: " + nameCollection);
      collectionDB.insertCollection(nameCollection);
      res.redirect('/');
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
        
        //console.log("form:" + JSON.stringify(jsonForm));
        //console.log("form header:" + JSON.stringify(jsonFormHeader));
        // insert api
        if(!idUser)
        {
          idUser="";
        }
        apiDB.insertApi(api,method,JSON.stringify(jsonFormHeader),JSON.stringify(jsonForm),JSON.stringify(file),idUser,datetime);
        jsonFormHeader = {};
        jsonForm = {};
        listKeyFile = [];
        
        request(options, function (error, response,body) { 
            if (error){
              res.redirect('/');
            };
            //console.log(response);
            let json = JSON.parse(body);
            //console.log("json :"+ JSON.stringify(json));
            rs.json = JSON.stringify(json);
            collectionDB.getCollection(idUser).then(data=>{
              //console.log("data "+ JSON.stringify(data));
              rs.listCollection = [];
              rs.listCollection = data.rows;
              apiDB.getApi().then( dt =>{
                rs.listApi = [];
                rs.listApi = dt.rows;
                res.render('index', { rs, url });
              })
            });
           });
    }
}
module.exports = home;


