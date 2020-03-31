var express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
var request = require('request');
// var axios = require('axios');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let file = null;
let jsonForm = {};
let listKeyFile = [];

let home = {

    get: function (req, res, next) {
        let rs = {};
        let url = "";
        //data.title = "Express";
        console.log("home");
        res.render('index', { rs, url });
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
    },
    //
    callApi: function (req, res, next) {
        var api = req.body.api;
        let data;
        let rs = {};
        let url = "";
        let method = req.body.method;
        // var key = req.body.name1;
        // var valueToken = req.body.value1;
        // console.log("Call API ");
        // console.log("file: ", req.files);
        // console.log(method);
        // console.log(key + " : " + valueToken);
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

        //test "body is text and text"
        // var options = {
        //   method: "PUT",
        //   url: "https://reqres.in/api/users/2",
        //   headers: {
        //     Authorization : "Bearer eFS3oJaQhRU1c5EajQUL",
        //     "Content-Type": "multipart/form-data; boundary=--------------------------070917261639122214163647"
        //   },
        //   formData:jsonForm
        // };

        //test "body is text and photo/video"
        var options = {
          method: "POST",
          url: "https://endpointff.eyeq.tech/recognize",
          headers: {
            Authorization : "Bearer eFS3oJaQhRU1c5EajQUL",
            "Content-Type": "multipart/form-data; boundary=--------------------------070917261639122214163647"
          },
          formData:jsonForm
        };

        //test body is photo/video and photo/video
        // var options = {
        //     method: "POST",
        //     url: "https://apirequest.eyeq.tech/ekyc/match",
        //     headers: {
        //       Authorization : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlpqUm1ZVE13TlRKak9XVTVNbUl6TWpnek5ESTNZMkl5TW1JeVkyRXpNamRoWmpWaU1qYzBaZz09In0.eyJzdWIiOiJxdWFuLnBoYW5AY2FyYm9uLnN1cGVyIiwiYmFja2VuZEp3dCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlJc0luZzFkQ0k2SWxwcVVtMVpWRTEzVGxSS2FrOVhWVFZOYlVsNlRXcG5lazVFU1ROWk1rbDVUVzFKZVZreVJYcE5hbVJvV21wV2FVMXFZekJhWnowOUluMD0uZXlKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5MWMyVnlibUZ0WlNJNkluRjFZVzR1Y0doaGJpSXNJbWgwZEhBNlhDOWNMM2R6YnpJdWIzSm5YQzlqYkdGcGJYTmNMM0p2YkdVaU9sc2lTVzUwWlhKdVlXeGNMM04xWW5OamNtbGlaWElpTENKSmJuUmxjbTVoYkZ3dlpYWmxjbmx2Ym1VaUxDSkJjSEJzYVdOaGRHbHZibHd2Wm1GalpTSXNJa2x1ZEdWeWJtRnNYQzl6Wld4bWMybG5iblZ3SWl3aVFYQndiR2xqWVhScGIyNWNMMlZyZVdNaUxDSkJjSEJzYVdOaGRHbHZibHd2Y1hWaGJpNXdhR0Z1WDBWTFdVTmZVRkpQUkZWRFZFbFBUaUpkTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5aGNIQnNhV05oZEdsdmJuUnBaWElpT2lJeE1GQmxjazFwYmlJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wydGxlWFI1Y0dVaU9pSlFVazlFVlVOVVNVOU9JaXdpYVhOeklqb2lkM052TWk1dmNtZGNMM0J5YjJSMVkzUnpYQzloYlNJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wyRndjR3hwWTJGMGFXOXVibUZ0WlNJNklrVkxXVU1pTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5bGJtUjFjMlZ5SWpvaWNYVmhiaTV3YUdGdVFHTmhjbUp2Ymk1emRYQmxjaUlzSW1oMGRIQTZYQzljTDNkemJ6SXViM0puWEM5amJHRnBiWE5jTDJWdVpIVnpaWEpVWlc1aGJuUkpaQ0k2SWkweE1qTTBJaXdpYUhSMGNEcGNMMXd2ZDNOdk1pNXZjbWRjTDJOc1lXbHRjMXd2WjJsMlpXNXVZVzFsSWpvaWNHaGhiaUlzSW1oMGRIQTZYQzljTDNkemJ6SXViM0puWEM5amJHRnBiWE5jTDJGd2NHeHBZMkYwYVc5dVZWVkpaQ0k2SWpJNU1tRXpNakExTFdSbE1HUXROREpqTXkxaU5UVXhMV0psTlRNNE5tVTBOR000TnlJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wzTjFZbk5qY21saVpYSWlPaUp4ZFdGdUxuQm9ZVzRpTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5bGJXRnBiR0ZrWkhKbGMzTWlPaUl4TmpFeU5UTXlRSE4wZFdSbGJuUXVhR050ZFhNdVpXUjFMblp1SWl3aWFIUjBjRHBjTDF3dmQzTnZNaTV2Y21kY0wyTnNZV2x0YzF3dmJHRnpkRzVoYldVaU9pSnhkV0Z1SWl3aVpYaHdJam94TlRneU56Z3dNVEUzTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5aGNIQnNhV05oZEdsdmJtbGtJam9pTXpJMkluMD0uT0ptYWlhanRVZ01fYUU0V2pORG41Nk1CQ3BnVDN1ZVhYN2pJbXpyUnpkbERFMlhzUll5cEVfVHJaVXFYQnBpNHhlUHNaMDZTengxQjU2ODdfQjZfNnJsWjNZeUhjenprUWFOLVNZVzlhdUhONEdaS2E4TGt3VmpudF9jeWhsT2dxMkE5c3g3RF94YUd3ZGJ6SzJQQ3V2U2o1Tk5UeEpmazczUEtzT0ZETXNzc1A2WVpVY3FqSURKOXo1dUtERVFaVHRHNmxLQ08yZ2w5SFFMbjBiRDA5NDVfdXhmQWVNMFdpS0tnampKNXdRWnV5aEN5MGdiVjhXd0tTMGhxT0hoWkFwX3l3R0lzLWlLVEp2RlMtZ01aX1NIeURTUUVDeUVnUk8xalYzOXhaV183UEQ3enkyeVU0SjFack9RSE1HZE5YMFpTYTFORDhnbU40bFpUVHRHNWZBPT0iLCJpc3MiOiJodHRwczpcL1wvMTkyLjE2OC4xLjMzOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJHb2xkIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOi0xLCJzcGlrZUFycmVzdFVuaXQiOiJOQSJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJFa3ljIiwiY29udGV4dCI6IlwvZWt5Y1wvdjEiLCJwdWJsaXNoZXIiOiJleWVxc3RvcmUiLCJ2ZXJzaW9uIjoidjEiLCJzdWJzY3JpcHRpb25UaWVyIjoiR29sZCJ9XSwiYXVkIjoiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5IiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJxdWFuLnBoYW4iLCJ0aWVyIjoiMTBQZXJNaW4iLCJuYW1lIjoiRUtZQyIsImlkIjozMjYsInV1aWQiOm51bGx9LCJzY29wZSI6ImFtX2FwcGxpY2F0aW9uX3Njb3BlIGVreWNfc3Vic2NyaWJlciIsImNvbnN1bWVyS2V5IjoiY1ZhaXZPY1FvOENIZlRkTldmRzhsZXBNbnJ3YSIsImV4cCI6MTU5MDU1NTIxNywiaWF0IjoxNTgyNzc5MjE3LCJqdGkiOiIzOTA3OGNiNC04ZTMxLTQxN2ItYTZkZi0wZTYzOWNmZjNjNDYifQ.Y2gQ3-Cf-Ho9D0k-AlKtP2dEvG7gnIxJxwRZtO9ZNidASE23zTEvQopt0tmaPXAWK1osKV4sMqu5h2RX6sfrXwVQs4JYkdF5KG2ZPaacOf6AVtPAn_ASjJQZ0ArlCUS4-4bHH_F5eSvBvK8uCf4WRNSQcIw8klE51YPZAMg6lX9h6nGKtE5G5XAv2isiHAYk2htlSXXyska0p_3a_gt_1JYtEUYxoChBmRCi_-nqg4A_AvmrByQyrMuUpkHnI1PaTQalFBW3BgBgabkVA6Ajci_WWsmYuTjrBJBRTc3_LaSladeNoVMJISkxQpLSHdMzqSVk6BEzN1jCX6C-FQbzyA",
        //       "Content-Type": "multipart/form-data; boundary=--------------------------070917261639122214163647"
        //     },
        //     formData:jsonForm
        //   };

        // var options = {
        //   method: method,
        //   url: api,
        //   headers: {
        //     Authorization : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlpqUm1ZVE13TlRKak9XVTVNbUl6TWpnek5ESTNZMkl5TW1JeVkyRXpNamRoWmpWaU1qYzBaZz09In0.eyJzdWIiOiJxdWFuLnBoYW5AY2FyYm9uLnN1cGVyIiwiYmFja2VuZEp3dCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlJc0luZzFkQ0k2SWxwcVVtMVpWRTEzVGxSS2FrOVhWVFZOYlVsNlRXcG5lazVFU1ROWk1rbDVUVzFKZVZreVJYcE5hbVJvV21wV2FVMXFZekJhWnowOUluMD0uZXlKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5MWMyVnlibUZ0WlNJNkluRjFZVzR1Y0doaGJpSXNJbWgwZEhBNlhDOWNMM2R6YnpJdWIzSm5YQzlqYkdGcGJYTmNMM0p2YkdVaU9sc2lTVzUwWlhKdVlXeGNMM04xWW5OamNtbGlaWElpTENKSmJuUmxjbTVoYkZ3dlpYWmxjbmx2Ym1VaUxDSkJjSEJzYVdOaGRHbHZibHd2Wm1GalpTSXNJa2x1ZEdWeWJtRnNYQzl6Wld4bWMybG5iblZ3SWl3aVFYQndiR2xqWVhScGIyNWNMMlZyZVdNaUxDSkJjSEJzYVdOaGRHbHZibHd2Y1hWaGJpNXdhR0Z1WDBWTFdVTmZVRkpQUkZWRFZFbFBUaUpkTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5aGNIQnNhV05oZEdsdmJuUnBaWElpT2lJeE1GQmxjazFwYmlJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wydGxlWFI1Y0dVaU9pSlFVazlFVlVOVVNVOU9JaXdpYVhOeklqb2lkM052TWk1dmNtZGNMM0J5YjJSMVkzUnpYQzloYlNJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wyRndjR3hwWTJGMGFXOXVibUZ0WlNJNklrVkxXVU1pTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5bGJtUjFjMlZ5SWpvaWNYVmhiaTV3YUdGdVFHTmhjbUp2Ymk1emRYQmxjaUlzSW1oMGRIQTZYQzljTDNkemJ6SXViM0puWEM5amJHRnBiWE5jTDJWdVpIVnpaWEpVWlc1aGJuUkpaQ0k2SWkweE1qTTBJaXdpYUhSMGNEcGNMMXd2ZDNOdk1pNXZjbWRjTDJOc1lXbHRjMXd2WjJsMlpXNXVZVzFsSWpvaWNHaGhiaUlzSW1oMGRIQTZYQzljTDNkemJ6SXViM0puWEM5amJHRnBiWE5jTDJGd2NHeHBZMkYwYVc5dVZWVkpaQ0k2SWpJNU1tRXpNakExTFdSbE1HUXROREpqTXkxaU5UVXhMV0psTlRNNE5tVTBOR000TnlJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wzTjFZbk5qY21saVpYSWlPaUp4ZFdGdUxuQm9ZVzRpTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5bGJXRnBiR0ZrWkhKbGMzTWlPaUl4TmpFeU5UTXlRSE4wZFdSbGJuUXVhR050ZFhNdVpXUjFMblp1SWl3aWFIUjBjRHBjTDF3dmQzTnZNaTV2Y21kY0wyTnNZV2x0YzF3dmJHRnpkRzVoYldVaU9pSnhkV0Z1SWl3aVpYaHdJam94TlRneU56Z3dNVEUzTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5aGNIQnNhV05oZEdsdmJtbGtJam9pTXpJMkluMD0uT0ptYWlhanRVZ01fYUU0V2pORG41Nk1CQ3BnVDN1ZVhYN2pJbXpyUnpkbERFMlhzUll5cEVfVHJaVXFYQnBpNHhlUHNaMDZTengxQjU2ODdfQjZfNnJsWjNZeUhjenprUWFOLVNZVzlhdUhONEdaS2E4TGt3VmpudF9jeWhsT2dxMkE5c3g3RF94YUd3ZGJ6SzJQQ3V2U2o1Tk5UeEpmazczUEtzT0ZETXNzc1A2WVpVY3FqSURKOXo1dUtERVFaVHRHNmxLQ08yZ2w5SFFMbjBiRDA5NDVfdXhmQWVNMFdpS0tnampKNXdRWnV5aEN5MGdiVjhXd0tTMGhxT0hoWkFwX3l3R0lzLWlLVEp2RlMtZ01aX1NIeURTUUVDeUVnUk8xalYzOXhaV183UEQ3enkyeVU0SjFack9RSE1HZE5YMFpTYTFORDhnbU40bFpUVHRHNWZBPT0iLCJpc3MiOiJodHRwczpcL1wvMTkyLjE2OC4xLjMzOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJHb2xkIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOi0xLCJzcGlrZUFycmVzdFVuaXQiOiJOQSJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJFa3ljIiwiY29udGV4dCI6IlwvZWt5Y1wvdjEiLCJwdWJsaXNoZXIiOiJleWVxc3RvcmUiLCJ2ZXJzaW9uIjoidjEiLCJzdWJzY3JpcHRpb25UaWVyIjoiR29sZCJ9XSwiYXVkIjoiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5IiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJxdWFuLnBoYW4iLCJ0aWVyIjoiMTBQZXJNaW4iLCJuYW1lIjoiRUtZQyIsImlkIjozMjYsInV1aWQiOm51bGx9LCJzY29wZSI6ImFtX2FwcGxpY2F0aW9uX3Njb3BlIGVreWNfc3Vic2NyaWJlciIsImNvbnN1bWVyS2V5IjoiY1ZhaXZPY1FvOENIZlRkTldmRzhsZXBNbnJ3YSIsImV4cCI6MTU5MDU1NTIxNywiaWF0IjoxNTgyNzc5MjE3LCJqdGkiOiIzOTA3OGNiNC04ZTMxLTQxN2ItYTZkZi0wZTYzOWNmZjNjNDYifQ.Y2gQ3-Cf-Ho9D0k-AlKtP2dEvG7gnIxJxwRZtO9ZNidASE23zTEvQopt0tmaPXAWK1osKV4sMqu5h2RX6sfrXwVQs4JYkdF5KG2ZPaacOf6AVtPAn_ASjJQZ0ArlCUS4-4bHH_F5eSvBvK8uCf4WRNSQcIw8klE51YPZAMg6lX9h6nGKtE5G5XAv2isiHAYk2htlSXXyska0p_3a_gt_1JYtEUYxoChBmRCi_-nqg4A_AvmrByQyrMuUpkHnI1PaTQalFBW3BgBgabkVA6Ajci_WWsmYuTjrBJBRTc3_LaSladeNoVMJISkxQpLSHdMzqSVk6BEzN1jCX6C-FQbzyA",
        //     "Content-Type": "multipart/form-data; boundary=--------------------------070917261639122214163647"
        //   },
        //   formData:jsonForm
        // };
        request(options, function (error, response,body) { 
            if (error) throw new Error(error);
            console.log(response);
            let json = JSON.parse(body);
            console.log("json :"+ JSON.stringify(json));
            rs.json = JSON.stringify(json);
            res.render('index', { rs, url })
           });
    }
}
module.exports = home;


