
let interval = null;
let counter = 2;
count_iteration = 2;
let iteration ;
let finalResult = [];
let collection;

let arrSave = [];
$(document).ready(function () {
    iteration = parseInt(document.getElementById("interation").innerHTML);
    let delay = parseInt(document.getElementById("delay").innerHTML);
    let eventEmail = document.getElementById("eventEmail").innerHTML;
    let countPass = 0;
    let countFail = 0;
    let i = 0;
    let statusCodeI1 = document.getElementsByClassName("api-statusCode")[0].innerHTML
    let statusCodeI2 = document.getElementsByClassName("api-statusCode")[1].innerHTML
    while(document.getElementsByClassName("api-statusCode")[i] != undefined)
    {
        //arrSave.push(document.getElementsByClassName("api-statusCode")[i].innerHTML);
        //console.log("abc: "+ document.getElementsByClassName("api-statusCode")[i].innerHTML);
        if(document.getElementsByClassName("api-statusCode")[i].innerHTML == "200")
        {
            countPass++;
        }
        else{
            countFail++;
        }
        i++;
    }
    
    console.log("status: " + arrSave);
    interval = setInterval(function(){
        let casetest = document.getElementById("caseTest").innerHTML;
        collection = casetest;
        var obj =  null;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                obj = JSON.parse(this.responseText);
                finalResult.push(obj);
                if(iteration == undefined){
                    document.getElementById("loading").style.display = "none";
                    clearInterval(interval);
                }
                else{
                    if(counter <= iteration){
                        $(".formResult")
                        .append("<p id=\"iteration\">Iteration "+ counter +"</p>");
                        obj.forEach(element => {
                            if(element.statusCode == 200){
                                countPass++;
                                $(".formResult")
                                .append("<div id=\"rowApi"+counter+"\" class=\"row rowOfApi\">"+
                                "<div class=\"col-1 col-shape\">" +
                                "<div class=\"shape shape-pass\"></div>"+
                                "</div>" +
                                "<span class=\"col-1 api-method\">"+ element.method +"</span>"+
                                "<span class=\"col-5 api-url\">" + element.url + "</span>"+
                                "<span class=\"col-1 col-circle\">"+
                                    "<div class=\"shape circle shape-circle\"></div>"+
                                "</span>"+
                                "<span class=\"col-1 api-statusCode\" >"+ element.statusCode +"</span>"+
                                "<span class=\"col-1 api-status\">"+ element.status + "</span>"+
                                "<span class=\"col-1 api-timerequest\">"+ element.timeRequest + " ms</span>"+
                                "</div>");
                                document.getElementsByClassName("numberOfPass")[0].innerHTML = countPass.toString();
                                console.log("pass: " + countPass);
                            }
                            else{
                                countFail++;
                                $(".formResult")
                                .append("<div id=\"rowApi"+counter+"\" class=\"row rowOfApi\">"+
                                "<div class=\"col-1 col-shape\">" +
                                "<div class=\"shape shape-fail\"></div>"+
                                "</div>" +
                                "<span class=\"col-1 api-method\">"+ element.method +"</span>"+
                                "<span class=\"col-5 api-url\">" + element.url + "</span>"+
                                "<span class=\"col-1 col-circle\">"+
                                    "<div class=\"shape circle shape-circle\"></div>"+
                                "</span>"+
                                "<span class=\"col-1 api-statusCode\" >"+ element.statusCode +"</span>"+
                                "<span class=\"col-1 api-status\"></span>"+
                                "<span class=\"col-1 api-timerequest\">"+ element.timeRequest + " ms</span>"+
                                "</div>");
                                document.getElementsByClassName("numberOfFail")[0].innerHTML = countFail.toString();
                                console.log("fail: " + countFail);
                            }
                        });
                       
                       
                      
                        
                       
                        counter++;
                        if(eventEmail.includes("alert")){
                            let contentEmail = "<h2>Iteration "+ count_iteration +": </h2>" + "<p>The API list is faulty: </p>";
                            let count = 1;
                            obj.forEach(element =>{
                                if(element.statusCode != 200){
                                    contentEmail = contentEmail + 
                                                    "<span>" + count + ": </span>"+
                                                    "<span style = \" margin-left: 10px; color: rgb(238, 177, 11);\"> url: " + element.url + "</span>" + 
                                                    "<span style = \" margin-left: 3px; color: green;\">, method: " + element.method + "</span>"+ 
                                                    "<span style = \" margin-left: 3px; color: red;\">, statusCode: " + element.statusCode + "</span>"+ 
                                                    "<span style = \" margin-left: 3px; color: dark;\">, status: " + element.status + "</span><br><hr>";
                                count++;
                                }
                            });
                            var xhttpSendMail = new XMLHttpRequest();
                            xhttpSendMail.onreadystatechange = function(){
                                if (this.readyState == 4 && this.status == 200) {
                                    alert("sent email alert");
                                }
                            };
                            xhttpSendMail.open("GET","/sendEmail?json=" + contentEmail );
                            xhttpSendMail.send();
                        }
                        if(eventEmail.includes("finish each iteration")){
                            let contentEmail = "<h2>Iteration " + count_iteration + ": </h2>" + "<p>List of api</p>";
                            let count = 1;
                            obj.forEach(element =>{
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
                                                "<br><hr>";
                                count ++;
                            });
                            var xhttpSendMail = new XMLHttpRequest();
                            xhttpSendMail.onreadystatechange = function(){
                                if (this.readyState == 4 && this.status == 200) {
                                    alert("sent email finish each iteration");
                                }
                            };
                            xhttpSendMail.open("GET","/sendEmail?json=" + contentEmail );
                            xhttpSendMail.send();
                                                
                        }
                    count_iteration ++;
                    }else{
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("circle_pass").style.display = "block";
                        document.getElementById("circle_fail").style.display = "block";
                        clearInterval(interval);
                        if(eventEmail.includes("finish all iteration")){
                            let contentEmail = "<h2>Final result:</h2>";
                            let ct = 1;
                            finalResult.forEach(item =>{
                                contentEmail = contentEmail + "<p style = \" margin-left: 10px; color: green;\"> iteration "+ ct + "</p>";
                                let count = 1;
                                item.forEach(element =>{
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
                                                    "<br><hr>";
                                    count ++;
                                });
                                ct++;
                            })
                            var xhttpSendMail = new XMLHttpRequest();
                            xhttpSendMail.onreadystatechange = function(){
                                if (this.readyState == 4 && this.status == 200) {
                                    alert("sent email all");
                                }
                            };
                            xhttpSendMail.open("GET","/sendEmail?json=" + contentEmail );
                            xhttpSendMail.send();
                        }
                        
                    }
                }
            }
        };
        xhttp.open("GET", "/ajaxCollection?casetest="+casetest, true);
        xhttp.send();
    }, delay);
  
    
    $(".btn-export").click(function(){
        alert(JSON.stringify(finalResult));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                alert("sent email all");
            }
        };
        xhttp.open("GET","/exportJson?json=" + JSON.stringify(finalResult) + "&casetest=" + collection, true);
        xhttp.send();
    });
})