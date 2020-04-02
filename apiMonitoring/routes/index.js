var express = require('express');
var home = require('../presenter/home');
var upload = require('../model/multerModel');
var router = express.Router();

/* GET home page. */
router.get('/',home.get);
router.post('/callApi',upload.array('files',2),home.callApi);
//router.post('/postImg',upload.single('file1'),home.postImg);

//ajax
router.get('/ajaxFlagNum', home.callApi);
router.get('/ajaxFlagNumHeader',home.getValueHeader)

module.exports = router;
