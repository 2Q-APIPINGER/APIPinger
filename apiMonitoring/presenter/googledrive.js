const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const {Storage} = require('@google-cloud/storage');
const { request } = require('http');
var ggdriveModel = require('../model/googledriveModel');

const SCOPES = ['https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.appdata',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.metadata',
               'https://www.googleapis.com/auth/drive.metadata.readonly',
               'https://www.googleapis.com/auth/drive.photos.readonly',
               'https://www.googleapis.com/auth/drive.readonly'
              ];
const TOKEN_PATH = 'token.json';

function enabletoGGDrive()
{
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), listFiles);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
     //callback(oAuth2Client,"12-89sGpB5bQEWWh1c_by048sXp62z1f-");
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

function signIn(clientId,redirect_uri,scope,url){
      
    // the actual url to which the user is redirected to 

    url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
    +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
    +"&access_type=offline";

    // this line makes the user redirected to the url
    window.location = url;
    
}

const storage = new Storage();
// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR12:', err);
  }
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
let jsonFormHeader = {};

const targetFolderId = "1uQL0Ses1z8ZHF9LGfff5TVt1HdTcauYY";
async function uploadFile(files){
  let nextIdApi = {};
  let nameOfFile ={};
  ggdriveModel.getNextIdApi().then(data=>{
    nextIdApi = data.rows;

   for(let i=0; i<files.length;i++)
   {
      nameOfFile[i] = "file-" + i + "-of-" + nextIdApi; 
      console.log(nameOfFile[i]);

      var fileMetadata = {
        'name': nameOfFile[i],
        parents:[targetFolderId]
      };
      var media = {
        mimeType: files[i].mimeType,
        body: fs.createReadStream(files[i].path)
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log('File Id: ', file.id);
        }
      });

   }

    
  })
}


module.exports = {
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
      // jsonFormHeader['Authorization'] = "Bearer " + accessToken;
      // jsonFormHeader['Accept'] = "application/json"; 

      // var options = {
      //   method: "GET",
      //   url: "https://www.googleapis.com/drive/v3/files/"+ fileId +"?key=" + apikey,
      //   headers: jsonFormHeader
      // }

      // request(options,function(error,res){
      //   if(!error){
      //     const filePath = "photo1.jpg";
      //     var dest = fs.createWriteStream(filePath);
      //     console.log(res);
      //   }
      // })
    //   const drive = google.drive({version: 'v3', auth});     
    //  // var done = "done"
    //   //console.log("fileid: " + fileId);
    //   //listBuckets();
    //   const filePath = "photo1.jpg";
    //   var dest = fs.createWriteStream(filePath);

      // drive.files.get({
      //   fileId: fileId,
      //   alt: 'media'
      // })
      //     .on('end', function () {
      //       console.log('Done');
      //     })
      //     .on('error', function (err) {
      //       console.log('Error during download', err);
      //     })
      //     .pipe(dest);

      const oAuth2Client = new google.auth.OAuth2(
        "386173715180-c31v9a1vbcra2atvno75vk60ep46raah.apps.googleusercontent.com");

      oAuth2Client.setCredentials(bearerToken);

      console.log("abc: " +JSON.stringify(oAuth2Client));
      downloadFile(fileId,oAuth2Client).catch(console.error);


    },
    uploadFileToGGDrive: function(req,res,next){
      var files = req.file;
      console.log("file:" + files);
      fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), uploadFile(files));
    });

     
    }
}