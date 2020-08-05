

$(document).ready(function(){
    let data;
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    $("#file-import").on('change',function(e){
        var file =  e. target. files[0];
        var path = (window.URL || window.webkitURL).createObjectURL(file);
        readTextFile(path, function(text){
            data = JSON.parse(text);
            console.log(JSON.stringify(data));
            //Your ajax call here.
        });
    });
    $(".import-collection").on('click',function(){
        document.getElementById("btn-importing").style.display = "block";
        var xhttp = new XMLHttpRequest();
        let url_import = document.getElementsByName("url-import")[0].value;
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("ModalImportCollection").style.display = "none";
                window.location.href = "/home";
            }
        };
        xhttp.open("GET", "/ajaxImportCollection?url="+ url_import + "&data=" + JSON.stringify(data), true);
        xhttp.send();
    })
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
                        "<div class=\"choose-file-other\" id=\"choose-file-other-body-" + count + "\">" +
                            "<button type=\"button\" class=\"other-choose-file\" id=\"other-choose-file-"+ count + "\">" +
                              "<img src=\"images/ellipsis.png\" alt=\"Other\">" +
                            "</button>" + 
                            "<div class=\"dropdown-to-choose\" id=\"dropdown-to-choose-body-" + count + "\">" +
                              "<button type=\"button\" class=\"input-ggdrive-body-" + count + "\" + onclick=\"showDialogGGPicker()\">" +                      
                                "<img src=\"images/icon-ggdrive.png\" alt=\"Google Drive\">" +
                              "</button>" +
                              "<button type=\"button\" class=\"input-dropbox-body-"+ count + "\" + onclick=\"showDropboxChooser()\">" +                           
                                  "<img src=\"images/icon-dropbox.png\" alt=\"Drop Box\">" +
                              "</button>" + 
                           " </div>" +
                          "</div>" +
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
      
        console.log("header:" + nameV + ":" + valueV);
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
        window.location.href = "/home";
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
    let varSaveIdApi;
    //select line of history
    $(".form-history").on('click','.history-1-line',function(){
        // var list = $("#idMethod").children;
        // console.log(list);
        var temp = $(this).attr("id");
        var pos = temp.slice(15);
        varSaveIdApi = pos;
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
                    
                }
                //auth & header
                var getHeader = JSON.parse(obj.rows[0].header);
                let countHeader1 = 0;
                $(".form-Params-header .line-1-param").remove();
                document.getElementsByClassName("header-auth")[0].style.display = "block";
                document.getElementsByClassName("form-bearer-token")[0].style.display = "none";
                document.getElementsByClassName("form-basic-auth")[0].style.display = "none";
                for(var header in getHeader)
                {
                    //console.log("header: "+header);
                    if(header.toString().toLowerCase() == "authorization")
                    {
                    //console.log("header: "+ getHeader.Authorization);
                        let auth = getHeader.Authorization;
                        let typeAuth = getHeader.Authorization.slice(0, auth.indexOf(" ")).toString();
                        switch(typeAuth.toLowerCase())
                        {
                            case "basic":{
                                document.getElementsByClassName("header-auth")[0].style.display = "none";
                                document.getElementsByClassName("form-bearer-token")[0].style.display = "none";
                                document.getElementsByClassName("form-basic-auth")[0].style.display = "block";
                                let str = auth.slice(auth.indexOf(" "));
                                //console.log(str);
                                let temp = window.atob(str);
                                //console.log(temp);
                                let username = temp.slice(0, temp.indexOf(":"));
                                let pass = temp.slice(temp.indexOf(":") + 1);
                                document.getElementsByClassName("input-username-auth")[0].value = username;
                                document.getElementsByClassName("input-pass-auth")[0].value = pass;
                                //console.log("u: " + username + "pass:" + pass);
                                break;
                            }
                            case "bearer":{
                                document.getElementsByClassName("header-auth")[0].style.display = "none";
                                document.getElementsByClassName("form-basic-auth")[0].style.display = "none";
                                document.getElementsByClassName("form-bearer-token")[0].style.display = "block";
                                let token = auth.slice(auth.indexOf(" "));
                                document.getElementsByClassName("input-bearer-token")[0].value = token;
                                break;
                            }

                        }
                    }
                    else if(header.toString().toLowerCase() != "content-type" && header.toString().toLowerCase() != null){
                        //console.log(header);
                        $(".form-Params-header")
                        .append("<div class=\"line-1-param\" id = \"line-1-param-" + countHeader1 + "\">" +              
                                    "<span class=\"span3\">" + 
                                        "<input class =\"input-name-header-" + countHeader1 + "\" type=\"text\" name=\"nameParam-header-" + countHeader1 +"\" placeholder=\"Name\" autocomplete=\"off\">" +                      
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span8\">" + 
                                        "<input class=\"input-value-header-" + countHeader1 + "\" type=\"text\" name=\"valueParam-header-"+ countHeader1 +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span1-delete\" id=\"span1-delete-"+ countHeader1 +"\">" + 
                                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                                    "</span>" + 
                                "<div>"                )    
                        document.getElementsByClassName("input-name-header-"+countHeader1)[0].value = header;
                        document.getElementsByClassName("input-value-header-"+countHeader1)[0].value = getHeader[header];  
                        
                        //send data header
                        var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {

                            }
                        };
                        if(header != "" && getHeader[header] != "")
                        {                 
                            xhttp.open("GET", "/ajaxFlagNumHeader?value1="+countHeader1 + "&value2=" + header + "&value3=" + getHeader[header], true);		          
                            xhttp.send();
                        }        
                        //end send
                        countHeader1++;
                    }
                }
                
                
                //body
                //var t2 = JSON.parse(obj.rows[0].file)
                // console.log(t2[0].filename);
                // console.log(obj.rows[0].file);
                var dataBody = JSON.parse(obj.rows[0].body);
                let countParamBody = 0;
                $(".form-Params .line-1-param").remove();
                for(var k in dataBody)
                {
                    //console.log(t100[k].key);
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
            
                    }
                    };
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
                        //send data body type text
                        
                        if(dataBody[k].key != "" && dataBody[k].value != "")
                        {
                                   
                            xhttp.open("GET", "/ajaxFlagNum?value1="+countParamBody + "&value2=text" + "&value3=" + dataBody[k].key + "&value4=" + dataBody[k].value, true);		         
                            xhttp.send();
                        }          
                        //end send
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
                        //send data body type text
                        
                        if(dataBody[k].key != "" && dataBody[k].options.filename != "")
                        {
                                   
                            xhttp.open("GET", "/ajaxFlagNum?value1="+countParamBody + "&value2=file" + "&value3=" + dataBody[k].key + "&value4=" + pos + "&value5=" + typeParamBody, true);		         
                            xhttp.send();
                        }          
                        //end send
                    }
                    countParamBody++;
                }
               
               
            }
        };
        xhttp.open("GET", "/ajaxLineHistory?value="+pos, true);
        xhttp.send();       

    });

    //select api in list of collection
    $(".list-api-collection").on('click','.each-collection',function(){
        var temp = $(this).attr("id");
        console.log(temp);
        var pos = temp.slice(16);
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
                    
                }
                //auth & header
                var getHeader = JSON.parse(obj.rows[0].header);          
                let countHeader1 = 0;
                $(".form-Params-header .line-1-param").remove();
                for(var header in getHeader)
                {
                    //console.log("header: "+header);
                    if(header.toString().toLowerCase() == "authorization")
                    {
                    //console.log("header: "+ getHeader.Authorization);
                        let auth = getHeader.Authorization;
                        let typeAuth = getHeader.Authorization.slice(0, auth.indexOf(" ")).toString();
                        switch(typeAuth.toLowerCase())
                        {
                            case "basic":{
                                document.getElementsByClassName("header-auth")[0].style.display = "none";
                                document.getElementsByClassName("form-bearer-token")[0].style.display = "none";
                                document.getElementsByClassName("form-basic-auth")[0].style.display = "block";
                                let str = auth.slice(auth.indexOf(" "));
                                //console.log(str);
                                let temp = window.atob(str);
                                //console.log(temp);
                                let username = temp.slice(0, temp.indexOf(":"));
                                let pass = temp.slice(temp.indexOf(":") + 1);
                                document.getElementsByClassName("input-username-auth")[0].value = username;
                                document.getElementsByClassName("input-pass-auth")[0].value = pass;
                                //console.log("u: " + username + "pass:" + pass);
                                break;
                            }
                            case "bearer":{
                                document.getElementsByClassName("header-auth")[0].style.display = "none";
                                document.getElementsByClassName("form-basic-auth")[0].style.display = "none";
                                document.getElementsByClassName("form-bearer-token")[0].style.display = "block";
                                let token = auth.slice(auth.indexOf(" "));
                                document.getElementsByClassName("input-bearer-token")[0].value = token;
                                break;
                            }

                        }
                    }
                    else if(header.toString().toLowerCase() != "content-type" && header.toString().toLowerCase() != null){
                        //console.log(header);
                        $(".form-Params-header")
                        .append("<div class=\"line-1-param\" id = \"line-1-param-" + countHeader1 + "\">" +              
                                    "<span class=\"span3\">" + 
                                        "<input class =\"input-name-header-" + countHeader1 + "\" type=\"text\" name=\"nameParam-header-" + countHeader1 +"\" placeholder=\"Name\" autocomplete=\"off\">" +                      
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span8\">" + 
                                        "<input class=\"input-value-header-" + countHeader1 + "\" type=\"text\" name=\"valueParam-header-"+ countHeader1 +"\" placeholder=\"Value\" autocomplete=\"off\" multiple>" +
                                    "</span>" + "&nbsp;" +
                                    "<span class=\"span1-delete\" id=\"span1-delete-"+ countHeader1 +"\">" + 
                                        "<img src=\"images/delete.png\" alt=\"Delete params\">" +
                                    "</span>" + 
                                "<div>"                )    
                        document.getElementsByClassName("input-name-header-"+countHeader1)[0].value = header;
                        document.getElementsByClassName("input-value-header-"+countHeader1)[0].value = getHeader[header];  
                        
                        //send data header
                        var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {

                            }
                        };
                        if(header != "" && getHeader[header] != "")
                        {                 
                            xhttp.open("GET", "/ajaxFlagNumHeader?value1="+countHeader1 + "&value2=" + header + "&value3=" + getHeader[header], true);		          
                            xhttp.send();
                        }        
                        //end send
                        countHeader1++;
                    }
                }
                
                
                //body
                //var t2 = JSON.parse(obj.rows[0].file)
                // console.log(t2[0].filename);
                // console.log(obj.rows[0].file);
                var dataBody = JSON.parse(obj.rows[0].body);
                let countParamBody = 0;
                $(".form-Params .line-1-param").remove();
                for(var k in dataBody)
                {
                    //console.log(t100[k].key);
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
            
                    }
                    };
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
                        //send data body type text
                        
                        if(dataBody[k].key != "" && dataBody[k].value != "")
                        {
                                   
                            xhttp.open("GET", "/ajaxFlagNum?value1="+countParamBody + "&value2=text" + "&value3=" + dataBody[k].key + "&value4=" + dataBody[k].value, true);		         
                            xhttp.send();
                        }          
                        //end send
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
                        //send data body type text
                        
                        if(dataBody[k].key != "" && dataBody[k].options.filename != "")
                        {
                                   
                            xhttp.open("GET", "/ajaxFlagNum?value1="+countParamBody + "&value2=file" + "&value3=" + dataBody[k].key, true);		         
                            xhttp.send();
                        }          
                        //end send
                    }
                    countParamBody++;
                }
               
               
            }
        };
        xhttp.open("GET", "/ajaxLineHistory?value="+pos, true);
        xhttp.send();       

    });

    $(".btn-sign-in").on('click',function(){
        window.location.href = "/login";
    });
    $(".btn-sign-up").on('click',function(){
        window.location.href = "/signup";
    });
    $(".close-modal").on('click',function(){
        document.getElementById("ModalSaveApi").style.display = "none";
        document.getElementById("ModalImportCollection").style.display = "none";
    });
    $(".btn-import-collection").on('click',function(){
        document.getElementById("ModalImportCollection").style.display = "block";
    });

    let nameCollection;
    $(".card-body").on('click','.a-collection',function(){
        var temp = $(this).attr("id");
        nameCollection = temp.slice(16);
        document.getElementById("collection-name-"+nameCollection).style.background = "#EEEEEE";
    });
    $(".save-api-to-collection").on('click',function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               
                document.getElementById("ModalSaveApi").style.display = "none";
                obj = JSON.parse(this.responseText);
                var xhttpHome = new XMLHttpRequest();
                xhttpHome.onreadystatechange = function() {};
                xhttpHome.open("GET", "/home", true);
                xhttpHome.send();
            }
        };
        xhttp.open("GET", "/ajaxSaveApiToCollection?value1="+ nameCollection + "&value2=" + varSaveIdApi, true);
        xhttp.send();

        nameCollection = "";
        varSaveIdApi = "";
    });
    // $(".form-Params .span8").on('click','.other-choose-file',function(){
    //     var temp = $(this).attr("id");
    //     var posOther = temp.slice(18);
    //     console.log(posOther);
    //     document.getElementById("dropdown-to-choose-body-"+posOther).style.display = "inline-flex";
       
    // })
   


    // $(".input-ggdrive-body-0").on('click',function(){
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function() {
    //       if (this.readyState == 4 && this.status == 200) {
    //        console.lo("lq:" + this.responseText);
    //       }
    //     };
    //     xhttp.open("GET", "/ajaxGoogleDrive", true);
    //     xhttp.send();


    // });

    $("#post-data-api").on('click',function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
          // console.log("kq:" + this.responseText);
          }
        };
        xhttp.open("GET", "/ajaxUploadToGGDrive", true);
        xhttp.send();
    });

    //logout
    $("#click-logout").on('click',function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              location.reload();
          }
        };
        xhttp.open("GET", "/ajaxLogout", true);
        xhttp.send();
    })
    

});

//google picker----------------------------------------------------------------------------
    // The Browser API key obtained from the Google API Console.
    // Replace with your own Browser API key, or your own key.
    var developerKey = 'AIzaSyAH75R-pVmSFApBFlnkrLLP310taZpGhE8';

    // The Client ID obtained from the Google API Console. Replace with your own Client ID.
    var clientId = "386173715180-c31v9a1vbcra2atvno75vk60ep46raah.apps.googleusercontent.com"

    // Replace with your own project number from console.developers.google.com.
    // See "Project number" under "IAM & Admin" > "Settings"
    var appId = "386173715180";

    // Scope to use to access user's Drive items.
    //var scope = ['https://www.googleapis.com/auth/drive.file'];
    var scope =  [
         'https://www.googleapis.com/auth/drive',
         'https://www.googleapis.com/auth/drive.appdata',
         'https://www.googleapis.com/auth/drive.file',
         'https://www.googleapis.com/auth/drive.metadata',
         'https://www.googleapis.com/auth/drive.metadata.readonly',
         'https://www.googleapis.com/auth/drive.photos.readonly',
         'https://www.googleapis.com/auth/drive.readonly',
      ];

    var pickerApiLoaded = false;
    var oauthToken;

function showDialogGGPicker()
{
    loadPicker();
}

function loadPicker() {
    gapi.load('auth', {'callback': onAuthApiLoad});
    gapi.load('picker', {'callback': onPickerApiLoad});
  };

  function onAuthApiLoad() {
    window.gapi.auth.authorize(
        {
          'client_id': clientId,
          'scope': scope,
          'immediate': false
        },
        handleAuthResult);
  };

  function onPickerApiLoad() {
    pickerApiLoaded = true;
    createPicker();
  };

  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      createPicker();
    }
  };

  // Create and render a Picker object for searching images.
  function createPicker() {
    if (pickerApiLoaded && oauthToken) {
      var view = new google.picker.View(google.picker.ViewId.DOCS);
      view.setMimeTypes("image/png,image/jpeg,image/jpg,video/mp4");
      var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setAppId(appId)
          .setOAuthToken(oauthToken)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setDeveloperKey(developerKey)
          .setCallback(pickerCallback)
          .build();
       picker.setVisible(true);
    }
  };

  // A simple callback implementation.
  function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
      var fileId = data.docs[0].id;
     // downloadFile(fileId);
      //alert('The user selected: ' + fileId);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         console.log(this.responseText);
        }
      };
      xhttp.open("GET", "/ajaxSendFileIdOfGGDrive?value1=" + fileId + "&value2="+oauthToken + "&value3="+developerKey, true);
      xhttp.send();
    }
  };

//   async function downloadFile(fileId){
//     const drive = google.drive({version: 'v3'});     
//     // var done = "done"
//      console.log("fileid: " + fileId);
//      //listBuckets();
//      const filePath = "photo2.jpg";
//      var dest = fs.createWriteStream(filePath);
//     return drive.files
//     .get({fileId, alt: 'media'}, {responseType: 'stream'})
//     .then(res => {
//       return new Promise((resolve, reject) => {
//         let progress = 0;
  
//         res.data
//           .on('end', () => {
//             console.log('Done downloading file.');
//             resolve(filePath);
//           })
//           .on('error', err => {
//             console.error('Error downloading file.');
//             reject(err);
//           })
//           .on('data', d => {
//             progress += d.length;
//             if (process.stdout.isTTY) {
//               process.stdout.clearLine();
//               process.stdout.cursorTo(0);
//               process.stdout.write(`Downloaded ${progress} bytes`);
//             }
//           })
//           .pipe(dest);
//       });
//     });
//   }



// function runCollection(){
//     alert("ok");
//     // let iteration = document.getElementsByClassName("iteration")[0].value;
//     // let delay = document.getElementsByClassName("iteration")[0].value;
//     // let casetest = document.getElementsByClassName("testCase")[0].value;
//     // console.log("++++ " + iteration + " : " + delay + " : " + casetest);
//     // var xhttp = new XMLHttpRequest();
// 	// 	    xhttp.onreadystatechange = function() {
// 	// 		if (this.readyState == 4 && this.status == 200) {

// 	// 		}
// 	// 	};
//     // xhttp.open("GET", "/runCollection" + "?casetest=" + casetest + "iteration=" + iteration + "&delay=" + delay, true);		          
//     // xhttp.send();
// }

//end google picker -------------------------------------------

//dropbox chooser --------------------------------------------------------

function showDropboxChooser()
{
    options = {

        // Required. Called when a user selects an item in the Chooser.
        success: function(files) {
            //alert("Here's the file link: " + files[0].link)
            var x=new XMLHttpRequest();
            x.open("GET", files[0].link, true);
            x.responseType = 'blob';
            x.onload=function(e){download(x.response, "image.jpg", "image/jpeg" ); }
            x.send();
        },
    
        // Optional. Called when the user closes the dialog without selecting a file
        // and does not include any parameters.
        cancel: function() {
    
        },
    
        // Optional. "preview" (default) is a preview link to the document for sharing,
        // "direct" is an expiring link to download the contents of the file. For more
        // information about link types, see Link types below.
        linkType: "direct", // or "direct" / "preview"
    
        // Optional. A value of false (default) limits selection to a single file, while
        // true enables multiple file selection.
        multiselect: false, // or true
    
        // Optional. This is a list of file extensions. If specified, the user will
        // only be able to select files with these extensions. You may also specify
        // file types, such as "video" or "images" in the list. For more information,
        // see File types below. By default, all extensions are allowed.
         extensions: ['.jpeg', '.jpg', '.png', '.mp4'],
        //extensions: ['.pdf', '.doc', '.docx'],
    
        // Optional. A value of false (default) limits selection to files,
        // while true allows the user to select both folders and files.
        // You cannot specify `linkType: "direct"` when using `folderselect: true`.
        folderselect: false, // or true
    
        // Optional. A limit on the size of each file that may be selected, in bytes.
        // If specified, the user will only be able to select files with size
        // less than or equal to this limit.
        // For the purposes of this option, folders have size zero.
        sizeLimit: 1024000, // or any positive number
    };
    Dropbox.choose(options);
}
//end dropbox chooser ----------------------------------------------

//begin expected Result ----------------------------------------------
function  saveAsExpectedResult(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // console.log(this.responseText);
        // let kq = JSON.parse(this.responseText);
        // let kq1 = JSON.stringify(kq);
        // let kq2 = JSON.stringify(kq1);
        alert("Saved!");
      }
    };
    xhttp.open("GET", "/ajaxSaveExpectedResult", true);
    xhttp.send();
}
//end expected Result ----------------------------------------------

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
          document.getElementById("choose-file-other-body-" + pos).style.display = "none";
        }
        else if(option[0].value === 'file')
        {
            $(".input-type-body-" + pos).attr("type",'file');
            $(".input-type-body-" + pos).attr("name",'files');
            document.getElementById("choose-file-other-body-" + pos).style.display = "inline";
        }
    });
    
};
function clickSaveApi()
{
    document.getElementById("ModalSaveApi").style.display = "block";
    document.getElementsByClassName("input-name-request")[0].value = document.getElementById("urlAPIID").value;
}

function run(param){
    alert("ok");
}


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

    //load info user after signed in
    var xhttpUser = new XMLHttpRequest();
    xhttpUser.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText);
            if(obj.rows[0].username !== "")
            {
                document.getElementsByClassName("btn-sign-in")[0].style.display = "none";
                document.getElementsByClassName("btn-sign-up")[0].style.display = "none";
                document.getElementsByClassName("user-signed-in")[0].style.display = "block";
                document.getElementsByClassName("nameOfUser")[0].innerHTML = obj.rows[0].firstname;
            }
            
        }
    };
    xhttpUser.open("GET", "/ajaxGetCookie", true);
    xhttpUser.send();

    //load home
    var xhttpHome = new XMLHttpRequest();
    xhttpHome.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
        }
    };
    xhttpHome.open("GET", "/home", true);
    xhttpHome.send();
}
