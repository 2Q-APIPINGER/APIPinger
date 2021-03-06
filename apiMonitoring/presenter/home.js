var express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
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
        collectionDB.getCollection().then(data=>{
          console.log("data "+ JSON.stringify(data));
          rs.listCollection = [];
          rs.listCollection = data.rows;
          res.render('index', { rs, url });
        });
    },
    postImg: function (req, res, next) {
        console.log("file ", file);
        let rs = {};
        let url = "";
        file = req.file;
        console.log("file ", file);
        res.redirect('/');
    },
    getValue : function(req,res,next){
      let numberLine = req.query.value1;
        if(numberLine){
          let type = req.query.value2;
          let key = req.query.value3;
          let value;
          if(type == 'text'){
            value = req.query.value4;
            jsonForm[key] = {
              "value": value,
              "options": {
                'contentType': 'text/html'
              }
            };
            console.log("key: "+ key + " type: "+ type + " value+ "+value);
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
      console.log("header: " + JSON.stringify(jsonFormHeader));
    },
    //create collection
    createCollection :function(req,res,next){
      //document.getElementById("form-create-collection").style.display = "none";
      let nameCollection = req.body.nameOfCollection;
      console.log("name: " + nameCollection);
      collectionDB.insertCollection(nameCollection);
      res.redirect('/');
    },
    callApi: function (req, res, next) {
        var api = req.body.api;
        let data;
        let rs = {};
        let url = "";
        let method = req.body.method;
        let usernameBasicAuth = req.body.usernameBasicAuth;
        let passBasicAuth = req.body.passBasicAuth;
        
        var file = req.files;
        console.log("files "+JSON.stringify(file));
        
        // add file for form
        for(let i=0; i<file.length; i++){
          jsonForm[listKeyFile[i]] = {
            "value": fs.createReadStream(file[i].path),
            "options": {
              "filename": file[i].filename,
              'contentType': file[i].mimetype
            }
          };
        };
        console.log("formData "+ JSON.stringify(jsonForm));
        jsonFormHeader['Content-Type'] = "multipart/form-data; boundary=--------------------------070917261639122214163647";
        
        console.log("headers: "+ jsonFormHeader);
        var options = {
          method: method,
          url: api,
          headers: jsonFormHeader,
          formData:jsonForm
        };
        
        console.log("form:" + JSON.stringify(jsonForm));
        console.log("form header:" + JSON.stringify(jsonFormHeader));
        // insert api
        apiDB.insertApi(api,method,JSON.stringify(jsonFormHeader),JSON.stringify(jsonForm));
        jsonFormHeader = {};
        jsonForm = {};
        listKeyFile = [];

        request(options, function (error, response,body) { 
            if (error){
              res.redirect('/');
            };
            console.log(response);
            let json = JSON.parse(body);
            console.log("json :"+ JSON.stringify(json));
            rs.json = JSON.stringify(json);
            collectionDB.getCollection().then(data=>{
              console.log("data "+ JSON.stringify(data));
              rs.listCollection = [];
              rs.listCollection = data.rows;
              res.render('index', { rs, url });
            });
           });
    }
}
module.exports = home;


