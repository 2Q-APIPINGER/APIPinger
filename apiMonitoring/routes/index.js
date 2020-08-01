var express = require('express');
var home = require('../presenter/home');
var upload = require('../model/multerModel');
var historyPresenter = require('../presenter/historyPresenter');
var signIn = require('../presenter/loginPresenter');
var collection = require('../presenter/collection');
var router = express.Router();
var authMiddleware = require('../middlewares/authMiddleware')
var loginPresenter = require('../presenter/loginPresenter');
var googleDrive = require('../presenter/googledrive');

const urlParse = require('url-parse');
const queryParse = require('query-string');

/* GET home page. */
router.get('/', function(req, res, next) {
    let id = req.cookies.userId;
    if(id != undefined){
        res.redirect("/home");
    }
    res.render('getStart');
});
router.get('/googleApi',function(req,res){
    res.send("code");
})
router.get('/contact',function(req,res,next){
    res.render("contact");
})
router.get('/home',home.get);
router.get('/removeCollection/:casetest', collection.remove);
router.get('/collectionDetail/:casetest', authMiddleware.requireAuth,collection.collectionDetail);
router.post('/newCollection',authMiddleware.requireAuth, home.createCollection);
router.post('/home',upload.array('files',2),home.callApi);
router.post('/runCollection/:casetest',collection.run);
//router.post('/postImg',upload.single('file1'),home.postImg);

//login
router.get('/login', signIn.signIn);
router.get('/signUp',signIn.signUp);
router.post('/signUp', signIn.registerAcc);
router.post('/login',signIn.loginAcc);

// router.get('/cookie', function(req,res,next){
//     res.cookie('user-id', 12345);
//     res.send("hello");
// })

//ajax
router.get('/ajaxFlagNum', home.getValue);
router.get('/ajaxFlagNumHeader',home.getValueHeader)
router.get('/ajaxHistory', historyPresenter.historyApi);
router.get('/ajaxLineHistory',historyPresenter.lineHistory);
router.get('/ajaxSendFile', home.callApi);
router.get('/ajaxGetCookie',loginPresenter.signInSuccess);
router.get('/ajaxSaveApiToCollection' ,collection.saveApiToCollection);
router.get('/ajaxCollection',collection.runCollection);
router.get('/exportJson',collection.exportJson);
router.get('/sendEmail',collection.sendEmail);
router.get('/ajaxGoogleDrive', googleDrive.uploadFileToGGDrive);
router.get('/ajaxSendFileIdOfGGDrive',googleDrive.downloadFileGGDrive);
router.get('/ajaxUploadToGGDrive', home.uploadFileToGGDrive);
router.get('/ajaxImportCollection',collection.import);
router.get('/eventEmail',collection.eventEmail);
router.get('/exportJson', collection.exportJson);

module.exports = router;
