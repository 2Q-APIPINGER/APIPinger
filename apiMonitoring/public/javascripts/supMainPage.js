$(document).ready(function(){
    // body
    var count = 0;
    $(".btn-add-param").click(function(){
        //alert("âbc");
        count = count + 1;
        $(".form-Params")
        .append("<div class=\"line-1-param\" id = \"line-1-param-" + count + "\">" +
                    // "<br>" +
                    "<span class=\"span3\">" + 
                        "<input class =\"input-name-body-" + count + "\" type=\"text\" name=\"nameParam-" + count +"\" placeholder=\"Name\" autocomplete=\"off\" style=\"margin-top: 10px;\">" +
                        "<select class=\"type-data-input-" + count + "\" onchange=\"selectTypeOfData()\">" +
                            "<option value=\"text\">Text</option>" +
                            "<option value=\"file\">File</option>" +
                        "</select>"+
                    "</span>" + "&nbsp;" +
                    "<span class=\"span8\">" + 
                        "<input class=\"input-type-body-" + count + "\" type=\"text\" name=\"valueParam-body-"+ count +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
                    "</span>" + "&nbsp;" +
                    "<span class=\"span1-delete\" id=\"span1-delete-"+ count +"\">" + 
                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                    "</span>" + 
                "<div>"                )
        
    });
    $(".form-Params").on('mouseenter','.line-1-param .span1-delete',function(){
        var temp = $(this).attr("id");
        console.log(temp);
        var pos = temp.slice(13);     
        $("#"+temp).click(function(){
            $("#line-1-param-"+pos).remove();
        });
    });
    //header
    var countHeader = 0;
    $(".btn-add-param-header").click(function(){
        //alert("âbc");
        countHeader = countHeader + 1;
        $(".form-Params-header")
        .append("<div class=\"line-1-param\" id = \"line-1-param-" + countHeader + "\">" +              
                    "<span class=\"span3\">" + 
                        "<input class =\"input-name-header-" + countHeader + "\" type=\"text\" name=\"nameParam-header-" + countHeader +"\" placeholder=\"Name\" autocomplete=\"off\" style=\"margin-top: 10px;\">" +                      
                    "</span>" + "&nbsp;" +
                    "<span class=\"span8\">" + 
                        "<input class=\"input-value-header-" + countHeader + "\" type=\"text\" name=\"valueParam-header-"+ countHeader +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
                    "</span>" + "&nbsp;" +
                    "<span class=\"span1-delete\" id=\"span1-delete-"+ countHeader +"\">" + 
                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                    "</span>" + 
                "<div>"                )       
    });
    $(".form-Params-header").on('mouseenter','.line-1-param .span1-delete',function(){
        var temp = $(this).attr("id");
        console.log(temp);
        var pos = temp.slice(13);     
        $("#"+temp).click(function(){
            $("#line-1-param-"+pos).remove();
        });
    });

    //param
     var countParam = 0;
     $(".btn-add-param-param").click(function(){
         countParam = countParam + 1;
        $(".form-Params-Params")
        .append("<div class=\"line-1-param\" id = \"line-1-param-" + countParam + "\">" +              
                    "<span class=\"span3\">" + 
                        "<input class =\"input-name-param-" + countParam + "\" type=\"text\" name=\"nameParam-param-" + countHeader +"\" placeholder=\"Name\" autocomplete=\"off\" style=\"margin-top: 10px;\">" +                      
                    "</span>" + "&nbsp;" +
                    "<span class=\"span8\">" + 
                        "<input class=\"input-value-param-" + countParam + "\" type=\"text\" name=\"valueParam-param-"+ countHeader +"\" placeholder=\"Value\"  autocomplete=\"off\">" +
                    "</span>" + "&nbsp;" +
                    "<span class=\"span1-delete\" id=\"span1-delete-"+ countParam +"\">" + 
                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                    "</span>" + 
                "<div>"                )   
         
     });
     $(".form-Params-Params").on('mouseenter','.line-1-param .span1-delete',function(){
         var temp = $(this).attr("id");
         console.log(temp);
         var pos = temp.slice(13);     
         $("#"+temp).click(function(){
             $("#line-1-param-"+pos).remove();
         });
     });
   
    //send data body
    $(".form-Params").on('change','.line-1-param',function(){
        var temp = $(this).attr("id");
        var pos = temp.slice(13);  

        var valueName = document.getElementsByClassName("input-name-body-" + pos)[0].value;
        var textValue = document.getElementsByClassName("input-type-body-" + pos)[0].value;
        var option = document.getElementsByClassName("type-data-input-" + pos)[0].value;

        var xhttp = new XMLHttpRequest();
		    xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

			}
		};
        if(valueName != "" && textValue != "")
        {
            if(option === 'text')
            {          
            	xhttp.open("GET", "/ajaxFlagNum?value1="+pos + "&value2=" + option + "&value3=" + valueName + "&value4=" + textValue, true);		
            }
            else if(option === 'file')
            {          
		        xhttp.open("GET", "/ajaxFlagNum?value1="+pos + "&value2=" + option + "&value3=" + valueName, true);		
            }  
            xhttp.send();
        }          
    });
       //send data header
       $(".form-Params-header").on('change','.line-1-param',function(){
        var temp = $(this).attr("id");
        var pos = temp.slice(13);  

        var nameV = document.getElementsByClassName("input-name-header-" + pos)[0].value;
        var valueV = document.getElementsByClassName("input-value-header-" + pos)[0].value;
      

        var xhttp = new XMLHttpRequest();
		    xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

			}
		};
        if(nameV != "" && valueV != "")
        {                 
            xhttp.open("GET", "/ajaxFlagNumHeader?value1="+pos + "&value2=" + nameV + "&value3=" + valueV, true);		          
            xhttp.send();
        }          
    });

    //create collection
    $(".btn-create-collection").click(function(){
        //alert("ok");
        document.getElementById("form-create-collection").style.display = "block";
        document.getElementById("content").style.opacity = "30%"
    });
    $(".btn-cancle-create").click(function(){
        document.getElementById("form-create-collection").style.display = "none";
        document.getElementById("content").style.opacity = "100%"
        document.ready.getElementById("collection-tab").addClass("active");
    });
    $(".btn-create-successfully").click(function(){
        document.getElementById("form-create-collection").style.display = "none";
    });
    // basic auth
    $(".auth-basic").click(function(){
        document.getElementsByClassName("header-auth")[0].style.display = "none";
        document.getElementsByClassName("form-basic-auth")[0].style.display = "block";
    });
    $(".auth-basic-text").click(function(){
        document.getElementsByClassName("header-auth")[0].style.display = "none";
        document.getElementsByClassName("form-basic-auth")[0].style.display = "block";
    });
    $(".form-basic-auth .span1").click(function(){
        document.getElementsByClassName("header-auth")[0].style.display = "block";
        document.getElementsByClassName("form-basic-auth")[0].style.display = "none";
    });
    // bearer token
    $(".auth-bearer").click(function(){
        document.getElementsByClassName("header-auth")[0].style.display = "none";
        document.getElementsByClassName("form-bearer-token")[0].style.display = "block";
    });
    $(".auth-bearer-text").click(function(){
        document.getElementsByClassName("header-auth")[0].style.display = "none";
        document.getElementsByClassName("form-bearer-token")[0].style.display = "block";
    });
    $(".form-bearer-token .span1").click(function(){
        document.getElementsByClassName("header-auth")[0].style.display = "block";
        document.getElementsByClassName("form-bearer-token")[0].style.display = "none";
    });
    $("#save").click(function(){
        
        document.getElementById("form-create-collection").style.display = "block";
        document.getElementById("content").style.opacity = "30%";
    })
    function compare(item1, item2){
        if(item1.lineNumber > item2.lineNumber)
        {
            return 1;
        }
        if(item1.lineNumber < item2.lineNumber)
        {
            return -1;
        }
        return 0;
    }
    let input = [];
    let arrPos = [];
    // $(".form-Params-Params").on('keyup','.line-1-param',function(){
    //     var temp = $(this).attr("id");
    //     var pos = temp.slice(13);
    //     let nameParams = document.getElementsByClassName("input-name-param-" + pos)[0].value;
    //     let valueParams = document.getElementsByClassName("input-value-param-" + pos)[0].value;
    //     if(nameParams != "" && valueParams != "")
    //     {
    //         input.push({lineNumber:pos,name:nameParams,value:valueParams});
    //         input.sort(compare);
    //         var url = document.getElementsByName("api")[0].value;
    //         if(url.indexOf('?')>0){
    //             url = url.substring(0,url.indexOf('?'));
    //         } 
    //         let i = 0;
    //         input.forEach(line =>{
    //             if(i == 0){
    //                 url = url + "?" + line.name + "=" + line.value ;
    //             }
    //             // nếu trong arr name or value còn trống ...
    //             else{
    //                 url = url+ "&" + line.name + "=" + line.value ;
    //             }
    //             i++;
    //         });
    //         document.getElementsByName("api")[0].value = url;
    //     }
    // });

    $(".form-Params-Params").on('keyup','.line-1-param',function(){
        var temp = $(this).attr("id");
        var pos = temp.slice(13);
        let nameParams = document.getElementsByClassName("input-name-param-" + pos)[0].value;
        let valueParams = document.getElementsByClassName("input-value-param-" + pos)[0].value;
        //if(nameParams != "" && valueParams != "")
        //{
       // var tempPos = input.indexOf(x=>x.lineNumber == pos);
           
        let tempPos = -1;
        for(i=0;i<input.length;i++)
        {
            if(input[i].lineNumber == pos)
            {
                tempPos = i;
                break;
            }
        }
        if(tempPos != -1)
        {
            input[tempPos].name = nameParams;
            input[tempPos].value = valueParams;
            
            var url = document.getElementsByName("api")[0].value;         
            url = url.substring(0,url.indexOf('?'));
           
            let i = 0;
            input.forEach(line =>{
                if(i == 0){
                    url = url + "?" + line.name + "=" + line.value ;
                }
              
                else{
                    url = url+ "&" + line.name + "=" + line.value ;
                }
                i++;
            });
            document.getElementsByName("api")[0].value = url;
        }
        else if(tempPos == -1)
        {
            input.push({lineNumber:pos,name:nameParams,value:valueParams});
            input.sort(compare);
            var url = document.getElementsByName("api")[0].value;
            if(url.indexOf('?')>0){
                url = url.substring(0,url.indexOf('?'));
            } 
            let i = 0;
            input.forEach(line =>{
                if(i == 0){
                    url = url + "?" + line.name + "=" + line.value ;
                }
              
                else{
                    url = url+ "&" + line.name + "=" + line.value ;
                }
                i++;
            });
            document.getElementsByName("api")[0].value = url;
        }
        
    });

    //select line of history
    $(".form-history").on('click','.history-1-line',function(){
        // var list = $("#idMethod").children;
        // console.log(list);
        var temp = $(this).attr("id");
        var pos = temp.slice(15);
        //console.log(chuoi);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                obj = JSON.parse(this.responseText);
                //url
                document.getElementById("urlAPIID").value = obj.rows[0].url;
                //method
                // $("#idMethod option:selected").text() = obj.rows[0].method;
                document.getElementById("idMethod").value = obj.rows[0].method;
                //param
                var url = obj.rows[0].url;
                var posQues = url.indexOf('?');
                $(".form-Params-Params .line-1-param").remove();
                if(posQues != -1)
                {
                    var paramString = url.slice(posQues + 1);
                    let arr = [];       //?name1=value1&name2=value2
                    for(let i=0; i< paramString.length;i++)
                    {
                        var posEqual = paramString.indexOf('=');
                        var posAnd = paramString.indexOf('&');
                        if(posAnd != -1)
                        {
                            arr.push({name: paramString.slice(i,posEqual), value: paramString.slice(posEqual + 1,posAnd)});
                            paramString = paramString.slice(posAnd + 1);
                            i = -1;
                        }
                        else{
                            arr.push({name: paramString.slice(i,posEqual), value: paramString.slice(posEqual + 1)});
                            i = paramString.length;
                        }                 
                    }
                    
                    var numParam = (url.match(/&/g) || []).length;//count number of '&' appear in url
                    //document.getElementsByClassName("input-name-param-0")[0].value = arr[0].name;
                    //document.getElementsByClassName("input-value-param-0")[0].value = arr[0].value;
                    for(let i=0;i<=numParam;i++)
                    {
                        $(".form-Params-Params")
                    .append("<div class=\"line-1-param\" id = \"line-1-param-" + i + "\">" +              
                                "<span class=\"span3\">" + 
                                    "<input class =\"input-name-param-" + i + "\" type=\"text\" name=\"nameParam-param-" + countHeader +"\" placeholder=\"Name\" autocomplete=\"off\">" +                      
                                "</span>" + "&nbsp;" +
                                "<span class=\"span8\">" + 
                                    "<input class=\"input-value-param-" + i + "\" type=\"text\" name=\"valueParam-param-"+ countHeader +"\" placeholder=\"Value\"  autocomplete=\"off\">" +
                                "</span>" + "&nbsp;" +
                                "<span class=\"span1-delete\" id=\"span1-delete-"+ i +"\">" + 
                                    "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                                "</span>" + 
                            "<div>"                );
                        document.getElementsByClassName("input-name-param-"+i)[0].value = arr[i].name;
                        document.getElementsByClassName("input-value-param-"+i)[0].value = arr[i].value;  
                    }
                    //auth
                }
                //body
                var t2 = JSON.parse(obj.rows[0].file)
                console.log(t2[0].filename);
                console.log(obj.rows[0].file);
                var dataBody = JSON.parse(obj.rows[0].body);
                let countParamBody = 0;
                $(".form-Params .line-1-param").remove();
                for(var k in dataBody)
                {
                    //console.log(t100[k].key);
                    var typeParamBody = dataBody[k].options.contentType.toString();
                    if(typeParamBody.search("text") != -1)
                    {
                        $(".form-Params")
                        .append("<div class=\"line-1-param\" id = \"line-1-param-" + countParamBody + "\">" +
                                    // "<br>" +
                                    "<span class=\"span3\">" + 
                                        "<input class =\"input-name-body-" + countParamBody + "\" type=\"text\" name=\"nameParam-" + countParamBody +"\" placeholder=\"Name\" autocomplete=\"off\">" +
                                        "<select class=\"type-data-input-" + countParamBody + "\" onchange=\"selectTypeOfData()\">" +
                                            "<option value=\"text\">Text</option>" +
                                            "<option value=\"file\">File</option>" +
                                        "</select>"+
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span8\">" + 
                                        "<input class=\"input-type-body-" + countParamBody + "\" type=\"text\" name=\"valueParam-body-"+ countParamBody +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span1-delete\" id=\"span1-delete-"+ countParamBody +"\">" + 
                                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                                    "</span>" + 
                                "<div>"                )
                        document.getElementsByClassName("input-name-body-"+countParamBody)[0].value = dataBody[k].key;
                        document.getElementsByClassName("input-type-body-"+countParamBody)[0].value = dataBody[k].value;
                    }
                    else{
                        $(".form-Params")
                        .append("<div class=\"line-1-param\" id = \"line-1-param-" + countParamBody + "\">" +
                                    // "<br>" +
                                    "<span class=\"span3\">" + 
                                        "<input class =\"input-name-body-" + countParamBody + "\" type=\"text\" name=\"nameParam-" + countParamBody +"\" placeholder=\"Name\" autocomplete=\"off\">" +
                                        "<select class=\"type-data-input-" + countParamBody + "\" onchange=\"selectTypeOfData()\">" +
                                            "<option value=\"text\">Text</option>" +
                                            "<option value=\"file\">File</option>" +
                                        "</select>"+
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span8\">" + 
                                        "<input class=\"input-type-body-" + countParamBody + "\" type=\"text\" name=\"valueParam-body-"+ countParamBody +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span1-delete\" id=\"span1-delete-"+ countParamBody +"\">" + 
                                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                                    "</span>" + 
                                "<div>"                );
                        document.getElementsByClassName("input-name-body-"+countParamBody)[0].value = dataBody[k].key;
                        document.getElementsByClassName("input-type-body-"+countParamBody)[0].value = dataBody[k].options.filename;
                        document.getElementsByClassName("type-data-input-"+countParamBody)[0].value = "file";
                        $(".form-Params").on("click",".line-1-param .input-type-body-"+countParamBody,function(){
                            $(this).attr("type",'file');
                        });
                    }
                    countParamBody++;
                }
               
               
            }
        };
        xhttp.open("GET", "/ajaxLineHistory?value="+pos, true);
        xhttp.send();
    });
});

function selectTypeOfData()
{
    $(".form-Params").on('click','.line-1-param',function(){
        
        var temp = $(this).attr("id");
        //console.log(temp);
        var pos = temp.slice(13);
        var option = document.getElementsByClassName("type-data-input-" + pos);
        //console.log(option[0].value);     
        if(option[0].value === 'text')
        {
          $(".input-type-body-" + pos).attr("type",'text');
          $(".input-type-body-" + pos).attr("name",'valueParam-body-' + pos);
        }
        else if(option[0].value === 'file')
        {
            $(".input-type-body-" + pos).attr("type",'file');
            $(".input-type-body-" + pos).attr("name",'files');
        }
    });
    
};
function run(param){
    alert("ok");
}
// function saveApi(){
//     //alert("ok");
   
// }
//load history
window.onload = function(){
    let i=0;
    var obj =  null;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        obj = JSON.parse(this.responseText);
        obj.rows.forEach(element => {        
            $(".form-history")
            .append("<a href = \"#\">" +
                        "<div class=\"history-1-line\" id=\"history-1-line-"+element.id+"\">" +
                            "<ul class=\"lv0-date-history\">" +
                                "<span>"+ element.time +"</span>" +
                                "<p class=\"id-line-history\">"+ element.id +"</p>" +                    
                            "</ul>" +                
                            "<ul class=\"lv0-history\">" +
                                "<span class=\"method-history\">"+ element.method +"</span>" +
                                "<p id=\"url-history\">"+ element.url +"</p>" +
                            "</ul>" +
                            "<hr>" +
                        "</div>" +
                        "</a>");
                    let temp = document.getElementsByClassName("method-history")[i].innerHTML;
                    
                    switch(temp.toLowerCase())
                    {
                        case "get":{
                            document.getElementsByClassName("method-history")[i].style.color = "blue";
                            break;
                        }  
                        case "post":{
                            document.getElementsByClassName("method-history")[i].style.color = "#FFCC00";
                            break;
                        }  
                        case "delete":{
                            document.getElementsByClassName("method-history")[i].style.color = "red";
                            break;
                        }  
                        case "put":{
                            document.getElementsByClassName("method-history")[i].style.color = "#008000";
                            break;
                        }  
                    }
                    i++;
        });
      }
    };
    xhttp.open("GET", "/ajaxHistory", true);
    xhttp.send();
}
