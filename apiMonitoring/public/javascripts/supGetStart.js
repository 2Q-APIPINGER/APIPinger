$(document).ready(function () {
    $(".btn-sign-in").on('click',function(){
        window.location.href = "/login";
    });
    $(".btn-sign-up").on('click',function(){
        window.location.href = "/signup";
    })
    $(".btn-try-it").on('click',function(){
        window.location.href = "/home";
    })
});