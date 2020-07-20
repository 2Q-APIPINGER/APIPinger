
let interval = null;
let counter = 2;
count_iteration = 2;
let iteration ;
let finalResult = [];

$(document).ready(function () {
    iteration = parseInt(document.getElementById("interation").innerHTML);
    let delay = parseInt(document.getElementById("delay").innerHTML);
    let eventEmail = document.getElementById("eventEmail").innerHTML;
    interval = setInterval(function(){
        let casetest = document.getElementById("caseTest").innerHTML;
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
                        .append("<p id=\"iteration\" style = \" height: 40px;background-color: rgb(207, 209, 211);border-radius: 5px;margin: 3px;padding-left: 15px;padding-top: 5px;margin-left: 10px;font-weight: 600;\">iteration "+ counter +"</p>");
                        obj.forEach(element => {
                            if(element.statusCode == 200){
                                $(".formResult")
                                .append("<div id=\"rowApi1\" class=\"row\" style=\"height: 50px;;margin: 5px;margin-left: 20px; border-style: ridge; border-color: rgb(236, 232, 232); padding-top: 5px;\">"+
                                "<div class=\"shape\" style=\"height: 30px; width: 30px; border: 10px; background-color: springgreen; margin-left: 10px;\"></div>"+
                                "<span style = \"color: rgb(49, 40, 173); margin-left: 10px;\">"+ element.method +"</span>"+
                                "<span style = \"color: grey; margin-left: 10px;\">" + element.url + "</span>"+
                                "<span>"+
                                    "<div class=\"shape circle\" style = \"height: 20px; width: 20px; border: 10px; background-color: gray; margin-left: 30px; \"></div>"+
                                "</span>"+
                                "<span style=\"color: grey;margin-left: 10px;\">"+ element.statusCode +"</span>"+
                                "<span style= \"color: rgb(238, 177, 11); margin-left: 10px;\">"+ element.status + "</span>"+
                                "<span style= \"color: rgb(4, 88, 22); margin-left: 10px;\">"+ element.timeRequest + " ms</span>"+
                                "</div>");
                            }
                            else{
                                $(".formResult")
                                .append("<div id=\"rowApi1\" class=\"row\" style=\"height: 50px;;margin: 5px;margin-left: 20px; border-style: ridge; border-color: rgb(236, 232, 232); padding-top: 5px;\">"+
                                "<div class=\"shape\" style=\"height: 30px; width: 30px; border: 10px; background-color: rgb(255, 0, 0); margin-left: 10px;\"></div>"+
                                "<span style = \"color: rgb(49, 40, 173); margin-left: 10px;\">"+ element.method +"</span>"+
                                "<span style = \"color: grey; margin-left: 10px;\">" + element.url + "</span>"+
                                "<span>"+
                                    "<div class=\"shape circle\" style = \"height: 20px; width: 20px; border: 10px; background-color: gray; margin-left: 30px; \"></div>"+
                                "</span>"+
                                "<span style=\"color: grey;margin-left: 10px;\">"+ element.statusCode +"</span>"+
                                "<span style= \"color: rgb(238, 177, 11); margin-left: 10px;\">"+ element.status + "</span>"+
                                "<span style= \"color: rgb(4, 88, 22); margin-left: 10px;\">"+ element.timeRequest + " ms</span>"+
                                "</div>");
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
        alert(parseInt(delay));
    });
})