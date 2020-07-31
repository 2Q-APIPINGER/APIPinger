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
        
        let flag = 0;
        let id  = generateRandomId(10);
        while(flag == 0)
        {           
            let check = acc.checkId(id);     
            if(JSON.stringify(check) === "{}")
            {
                flag = 1;
            }
            else{
                id = generateRandomId(10);
            }
        }
        
        //hash pass
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(pass,salt,function(err,hash){
                acc.registerAcc(username,hash,email,firstname,lastname,id);
                res.redirect('login');

            });
        });       
    },
    loginAcc: function(req,res,next){
        let username = req.body.username_login;
        let pass = req.body.password_login;
        let passHass = {};
        let id = {};
        acc.getPass(username).then(rs=>{
            passHass.Pass = rs.rows;
            // console.log(passHass.Pass[0].password);
            let passDB = passHass.Pass[0].password;
            
            bcrypt.compare(pass.toString(),passDB).then(function(result){               
                    if(result)
                    {
                        acc.getID(username).then(rs1=>{
                            id.ID = rs1.rows;
                            res.cookie('userId', id.ID[0].id);
                            acc.getUser(id.ID[0].id).then(acc =>{
                                res.cookie('email', acc.rows[0].email);
                                res.redirect('/home');
                            })
                            
                        })
                    }
                    else{
                        res.redirect('/login');
                    }                  
                 })        
        })       
    },
    signInSuccess:(req,res)=>{
        let userId = req.cookies.userId;
        acc.getUser(userId).then(rs=>{
            res.json(rs);
        })
    },
    logOut: (req,res)=>{
        console.log("vo logout");
        //req.logout();
        res.clearCookie("email",{path:"/",httpOnly:true});
        res.clearCookie("userId",{path:"/",httpOnly:true});
        res.redirect('/home');
        // req.session.destroy(function (err) {
        //     res.redirect('/'); //Inside a callback… bulletproof!
        // });
    }
};
function generateRandomId(length) {
    var rdmString = "";
    for( ; rdmString.length < length; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, length);
}
