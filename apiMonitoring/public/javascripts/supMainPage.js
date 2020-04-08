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
                        "<input class =\"input-name-param-" + countParam + "\" type=\"text\" name=\"nameParam-param-" + countHeader +"\" placeholder=\"Name\" onkeyup=\"autoEnterUrl()\" autocomplete=\"off\" style=\"margin-top: 10px;\">" +                      
                    "</span>" + "&nbsp;" +
                    "<span class=\"span8\">" + 
                        "<input class=\"input-value-param-" + countParam + "\" type=\"text\" name=\"valueParam-param-"+ countHeader +"\" placeholder=\"Value\" onkeyup=\"autoEnterUrl()\" autocomplete=\"off\">" +
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

    //param - put param on url
    var arrPos = [];
    var arrName = [];
    var arrValue = [];
    var arrNameOld = [];
    var arrValueOld = [];
    var min;

    function autoEnterUrl()
    {
        var temp;
        var pos;
        $(".form-Params-Params").on('change','.line-1-param',function(){
            temp = $(this).attr("id");
            pos = temp.slice(13);
        });
      
        var find = arrPos.indexOf(pos);
        arrName[pos] = document.getElementsByClassName("input-name-param-" + pos)[0].value;
        arrValue[pos] = document.getElementsByClassName("input-value-param-" + pos)[0].value;
        // arrNameOld[pos] = document.getElementsByClassName("input-name-param-" + pos)[0].value;
        // arrValueOld[pos] = document.getElementsByClassName("input-value-param-" + pos)[0].value;

        console.log(arrValue[pos]);

        var url = document.getElementsByClassName("urlAPI")[0].value;
       
        if(find == -1)
        {
            
            if(arrPos.length == 0)
            {
                url = url + "?" + arrName[pos] + "=" + arrValue[pos] + "&";
                min = pos;
                arrPos.push(pos);
            }
            else{
                arrPos.push(pos);
                arrPos.sort(function(a,b){return Number(a)-Number(b)});
                console.log("min: " + min + "pos: " + pos);
                if(pos > min)
                {
                    url = url + arrName[pos] + "=" + arrValue[pos] + "&";
                }
                else{
                    min = pos;
                    var count = 0;
                    var findPos = arrPos.indexOf(pos);
                    var qMarkPos = url.indexOf("?");
                    var arrParam = [];
                    var subString = url.substr(qMarkPos + 1);
                 
                    var urlAfter = url.substr(0,qMarkPos + 1);
                  
                    while(findPos != count)
                    {   
                        var tempAnd = subString.indexOf("&");
                        var stringRep = subString.substr(0,tempAnd)
                        arrParam.push(stringRep);
                        subString.replace(stringRep,"");
                        count = count + 1;
                    }
                    
                    for(i=0; i<arrParam.length;i++)
                    {
                        urlAfter = urlAfter + arrParam[i];
                    }
                    urlAfter = urlAfter + arrName[pos] + "=" + arrValue[pos] + "&" + subString;
                    console.log("urlafter1" + urlAfter);
                }
            }
        }
    }

    $(".form-Params-Params").on('change','.line-1-param',function(){
        var temp = $(this).attr("id");
        var pos = temp.slice(13);
        var find = arrPos.indexOf(pos);
        arrName[pos] = document.getElementsByClassName("input-name-param-" + pos)[0].value;
        arrValue[pos] = document.getElementsByClassName("input-value-param-" + pos)[0].value;
        arrNameOld[pos] = document.getElementsByClassName("input-name-param-" + pos)[0].value;
        arrValueOld[pos] = document.getElementsByClassName("input-value-param-" + pos)[0].value;

        console.log(arrValue[pos]);

        var url = document.getElementsByClassName("urlAPI")[0].value;
       
        if(find == -1)
        {
            
            if(arrPos.length == 0)
            {
                url = url + "?" + arrName[pos] + "=" + arrValue[pos] + "&";
                min = pos;
                arrPos.push(pos);
            }
            else{
                arrPos.push(pos);
                arrPos.sort(function(a,b){return Number(a)-Number(b)});
                console.log("min: " + min + "pos: " + pos);
                if(pos > min)
                {
                    url = url + arrName[pos] + "=" + arrValue[pos] + "&";
                }
                else{
                    min = pos;
                    var count = 0;
                    var findPos = arrPos.indexOf(pos);
                    var qMarkPos = url.indexOf("?");
                    var arrParam = [];
                    var subString = url.substr(qMarkPos + 1);
                 
                    var urlAfter = url.substr(0,qMarkPos + 1);
                  
                    while(findPos != count)
                    {   
                        var tempAnd = subString.indexOf("&");
                        var stringRep = subString.substr(0,tempAnd)
                        arrParam.push(stringRep);
                        subString.replace(stringRep,"");
                        count = count + 1;
                    }
                    
                    for(i=0; i<arrParam.length;i++)
                    {
                        urlAfter = urlAfter + arrParam[i];
                    }
                    urlAfter = urlAfter + arrName[pos] + "=" + arrValue[pos] + "&" + subString;
                    console.log("urlafter1" + urlAfter);
                }
            }
        }





        $(".form-Params-Params").on('onkeypress','.line-1-param',function(){
            $('#urlAPIID').val(url);
        });
        // else
        // {

        // }
       
      
       
        
        
        
    });
});

function selectTypeOfData()
{
    
     //= getPosElement();
   // var result;
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
var arrPos = [];
var arrName = [];
var arrValue = [];
var arrNameOld = [];
var arrValueOld = [];
var min;

// function autoEnterUrl()
// {
    
//     $(".form-Params-Params").on('change','.line-1-param',function(){
//         var temp = $(this).attr("id");
//         var pos = temp.slice(13);
//         var find = arrPos.indexOf(pos);
//         arrName[pos] = document.getElementsByClassName("input-name-param-" + pos)[0].value;
//         arrValue[pos] = document.getElementsByClassName("input-value-param-" + pos)[0].value;
     
//         var url = document.getElementsByClassName("urlAPI")[0].value;

//         $('#urlAPIID').val(url + "?" + arrName[pos] + "=" + arrValue[pos] + "&");
//        if(find == -1)// add new
//        {
//             if(arrPos.length == 0)
//             {
//                 min = pos;
//                 arrPos.push(pos);
//                 $('#urlAPIID').val(url + "?" + arrName[pos] + "=" + arrValue[pos] + "&");
//             }
//             else{
//                 arrPos.push(pos);
//                 arrPos.sort(function(a,b){return Number(a)-Number(b)});
//                 var posNew = arrPos.indexOf(pos);
//                 var posAdd;
//                 var count = 0;
//                 for(i=0;i<url.length;i++)
//                 {
//                     if(url[i] == "&")
//                     {
//                         count++;
//                         if(count == posNew)
//                         {
//                             posAdd = i;
//                         }
//                     }
//                 }
//                 var urlLeft = url.substr(0,posAdd + 1);
//                 var urlRight = url.substr(posAdd + 1);
//                 var urlRel = urlLeft + arrName[pos] + "=" + arrValue[pos] + "&" + urlRight;
//                 $('#urlAPIID').val(urlRel);
//             }
//        }
//        else // exist pos in arrPos
//        {
//             var posNew = arrPos.indexOf(pos);
//             var posAdd;
//             var count = 0;
//             for(i=0;i<url.length;i++)
//             {
//                 if(url[i] == "&")
//                 {
//                     count++;
//                     if(count == posNew)
//                     {
//                         posAdd = i;
//                     }
//                 }
//             }
//             var urlLeft = url.substr(0,posAdd + 1);
//             var urlRight = url.substr(posAdd + 1);
//             var urlRel = urlLeft + arrName[pos] + "=" + arrValue[pos] + "&" + urlRight;
//             $('#urlAPIID').val(urlRel);
//        }

      
        
//     });
// }
