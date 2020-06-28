
let interval = null;
let counter = 2;
let iteration ;
let exportJson = {};

$(document).ready(function () {
    iteration = parseInt(document.getElementById("interation").innerHTML);
    let delay = parseInt(document.getElementById("delay").innerHTML);
    interval = setInterval(function(){
        let casetest = document.getElementById("caseTest").innerHTML;
        var obj =  null;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                obj = JSON.parse(this.responseText);
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
                    }else{
                        document.getElementById("loading").style.display = "none";
                        document.getElementById("circle_pass").style.display = "block";
                        document.getElementById("circle_fail").style.display = "block";
                        clearInterval(interval);
                        exportJson['result'] = [];
                        exportJson['count'] = iteration;
                        exportJson['collection'] = {
                            name: casetest,
                            request:[]
                        }
                        obj.forEach(item =>{
                            exportJson.result.push(
                                {
                                    name: item.url,
                                    responseCode:{
                                        code : item.statusCode,
                                        name: item.status
                                    },
                                    test: {},
                                    testPassFailCounts: {}
                                }
                            );
                            exportJson.collection.request.push({
                                url: item.url,
                                method: item.method
                            });
                        });
                        
                        console.log("json" + JSON.stringify(exportJson));
                        // let contentEmail = "<table class=\"table table-dark\">" + 
                        //                         "<thead>"+
                        //                             "<tr>"+
                        //                                 "<th scope=\"col\">#</th>"+
                        //                                 "<th scope=\"col\">First</th>"+
                        //                             "</tr>"+
                        //                         "</thead>"+
                        //                         "<tbody>"+
                        //                             "<tr>"+
                        //                                 "<th scope=\"row\">1</th>" +
                        //                                 "<th scope=\"row\">quan</th>"
                        //                             "</tr>"+
                        //                             "<tr>"+
                        //                                 "<th scope=\"row\">2</th>" +
                        //                                 "<th scope=\"row\">hau</th>"
                        //                             "</tr>"+
                        //                         "</tbody>"+
                        //                     "</table>";
                        let contentEmail =  "<div style = \"background-color: black; padding: 50px\">"+
                                            "<h2 style = \"color: red; margin-left: 100px;\"> Result</h2>" +
                                            "<p  style = \"color: white\">{</p>"+
                                            "<p style = \"color: white\">  count: " + iteration + "</p>" +
                                            "<p style = \"color: white\">  result: [ </p>" ;
                        exportJson.result.forEach(item =>{
                            contentEmail = contentEmail + "<p style = \"color: white\">{</p>" +
                                                          "<p style = \"color: white\">  name: "+ item.name +",</p>"+
                                                          "<p style = \"color: white\">  responseCode: {"+
                                                          "<p style = \"color: white\">    code: "+ item.responseCode.code + ",</p>"+
                                                          "<p style = \"color: white\">    name: "+ item.responseCode.name + "</p>"+
                                                          "<p style = \"color: white\">  },</p>"+
                                                          "<p style = \"color: white\">  test: {},"+
                                                          "<p style = \"color: white\">  testPassFailCounts: {}</p>"+
                                                          "<p style = \"color: white\"> }</p>";
                        });
                        contentEmail = contentEmail +   "<p style = \"color: white\">],</p>" +
                                                        "<p style = \"color: white\"> collection: {"+
                                                        "<p style = \"color: white\"> name: "+ casetest + ",</p>"+
                                                        "<p style = \"color: white\"> request: [";
                        exportJson.collection.request.forEach(item =>{
                            contentEmail = contentEmail + "<p style = \"color: white\">{</p>"+
                                                          "<p style = \"color: white\">    url: "+ item.url + "</p>"+
                                                          "<p style = \"color: white\">    method: "+ item.method + "</p>"+
                                                          "<p style = \"color: white\">}</p>";
                        })                  
                        contentEmail = contentEmail + "<p style = \"color: white\">]</p>" + "<p style = \"color: white\">}</p> </div>";
                        
                        var result = JSON.stringify(exportJson);
                        var xhttpSendMail = new XMLHttpRequest();
                        xhttpSendMail.onreadystatechange = function(){
                            if (this.readyState == 4 && this.status == 200) {
                                alert("sent email");
                                 //alert(this.responseText);
                            }
                        };
                        xhttpSendMail.open("GET","/sendEmail?json=" + contentEmail );
                        xhttpSendMail.send();
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