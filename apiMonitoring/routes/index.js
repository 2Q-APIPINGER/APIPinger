var express = require('express');
var home = require('../presenter/home');
var upload = require('../model/multerModel');
var historyPresenter = require('../presenter/historyPresenter');
var signIn = require('../presenter/loginPresenter');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Văn phòng phẩm' });
// });
router.get('/',home.get);
router.post('/newCollection',home.createCollection);
router.post('/callApi',upload.array('files',2),home.callApi);
//router.post('/postImg',upload.single('file1'),home.postImg);

//login
router.get('/login', signIn.signIn);
router.get('/signUp',signIn.signUp);
router.post('/signUp', signIn.registerAcc);

//ajax
router.get('/ajaxFlagNum', home.getValue);
router.get('/ajaxFlagNumHeader',home.getValueHeader)
router.get('/ajaxHistory', historyPresenter.historyApi);
router.get('/ajaxLineHistory',historyPresenter.lineHistory);
router.get('/ajaxSendFile', home.callApi);

module.exports = router;
