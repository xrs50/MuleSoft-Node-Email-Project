var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html', {"root": __dirname});
});

router.get('/login', function(req, res, next){
  res.sendFile('login.html', {"root": __dirname});
});

router.get('/createAccount', function(req, res, next){
  res.sendFile('createAccount.html', {"root": __dirname});

});

router.get('/inbox', function(req, res, next){

});

router.get('/reply', function(req, res, next){

});

router.get('/newEmail', function(req, res, next){

});

module.exports = router;
