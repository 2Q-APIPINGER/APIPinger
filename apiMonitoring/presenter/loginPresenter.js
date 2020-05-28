var acc = require('../model/loginModel');
var bcrypt = require('bcryptjs');
module.exports={
    signIn:(req,res)=>{
        res.render('login');
    },
    signUp:(req,res)=>{
        res.render('signup');
    },
    registerAcc: function(req,res,next){
        let firstname = req.body.name_firstname_signup;
        let lastname = req.body.name_lastname_signup;
        let email = req.body.name_email_signup;
        let username = req.body.name_username_signup;
        let pass = req.body.name_pass_signup;

        //hash pass
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(pass,salt,function(err,hash){
                acc.registerAcc(username,hash,email,firstname,lastname);
                res.render('login');

                // bcrypt.compare('tnq2911',hash,function(err,res){
                //     console.log("equal");
                //     console.log(res);
                // })
                // bcrypt.compare('not_bacon', hash, function (err, res) {
                //     // res == false
                //     console.log('not equal')
                //     console.log(res)
                // })
            });
        });
        
    }
}