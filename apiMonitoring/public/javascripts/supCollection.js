$(document).ready(function() {
    // $('.mdb-select').materialSelect();
    let eventEmail ;
    $(".selectpicker").change(function () {
        var selectedItem = $('.selectpicker').val();
        eventEmail = selectedItem;
        console.log(eventEmail);
    });
    $(".btn-runCollection").click(function () {
        // let casetest = document.getElementById("case_test").innerHTML;
        console.log( "event: "+ eventEmail);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open("GET", "/eventEmail?eventEmail=" + eventEmail, true);
        xhttp.send();
    });
    
});
    

window.onload = function(){
    
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
}
