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