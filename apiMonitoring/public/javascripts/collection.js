let interval = null;
let counter = 2;
let iteration ;

$(document).ready(function () {
    document.getElementById("loading").style.display = "block"
    iteration = parseInt(document.getElementById("interation").innerHTML);
    let delay = parseInt(document.getElementById("delay").innerHTML);
    interval = setInterval(function(){
        let casetest = document.getElementById("caseTest").innerHTML;
        var obj =  null;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                obj = JSON.parse(this.responseText);
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
                            "</div>");
                        }
                    });
                    counter++;
                }else{
                    document.getElementById("loading").style.display = "none";
                    clearInterval(interval);
                }
            }
        };
        xhttp.open("GET", "/ajaxCollection?casetest="+casetest, true);
        xhttp.send();
    }, delay);
    
    
    $(".btn-export").click(function(){
        alert(parseInt(t) + ", " +parseInt(delay));
    });
})