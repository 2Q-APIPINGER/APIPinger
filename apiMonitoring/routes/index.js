var express = require('express');
var home = require('../presenter/home');
var upload = require('../model/multerModel');
var historyPresenter = require('../presenter/historyPresenter');
var signIn = require('../presenter/loginPresenter');
var collection = require('../presenter/collection');
var router = express.Router();
var authMiddleware = require('../middlewares/authMiddleware')
var loginPresenter = require('../presenter/loginPresenter');

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Văn phòng phẩm' });
// });
router.get('/',home.get);
router.get('/collectionDetail/:casetest', authMiddleware.requireAuth,collection.collectionDetail);
router.post('/newCollection',authMiddleware.requireAuth, home.createCollection);
router.post('/callApi',upload.array('files',2),home.callApi);
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

module.exports = router;
