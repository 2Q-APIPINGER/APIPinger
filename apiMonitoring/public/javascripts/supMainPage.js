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
                        "<input class=\"input-value-param-" + countParam + "\" type=\"text\" name=\"valueParam-param-"+ countHeader +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
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
    $(".form-Params-Params").on('change','.line-1-param',function(){
        var temp = $(this).attr("id");
        var pos = temp.slice(13);
        let nameParams = document.getElementsByClassName("input-name-param-" + pos)[0].value;
        let valueParams = document.getElementsByClassName("input-value-param-" + pos)[0].value;
        if(nameParams != "" && valueParams != ""){
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
                }else{
                    url = url+ "&" + "?" + line.name + "=" + line.value ;
                }
                i++;
            });
            document.getElementsByName("api")[0].value = url;
        }
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
