var acc = require('../model/loginModel');

module.exports={
    requireAuth: (req,res,next)=>{
        if(!req.cookies.userId)
        {
            res.redirect('/login');
            return;
        }
        let check = acc.getUser(req.cookies.userId);
        acc.getUser(req.cookies.userId).then(rs=>{
            if(rs.rows == null)
            {
                res.redirect('/login');
                return;
            }
        })
        next();
    }
}