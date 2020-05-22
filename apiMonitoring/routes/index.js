var express = require('express');
var home = require('../presenter/home');
var upload = require('../model/multerModel');
var historyPresenter = require('../presenter/historyPresenter');
var router = express.Router();

/* GET home page. */
router.get('/',home.get);
router.post('/newCollection',home.createCollection);
router.post('/callApi',upload.array('files',2),home.callApi);
//router.post('/postImg',upload.single('file1'),home.postImg);

//ajax
router.get('/ajaxFlagNum', home.getValue);
router.get('/ajaxFlagNumHeader',home.getValueHeader)
router.get('/ajaxHistory', historyPresenter.historyApi);
router.get('/ajaxLineHistory',historyPresenter.lineHistory);
router.get('/ajaxSendFile', home.callApi);

module.exports = router;
