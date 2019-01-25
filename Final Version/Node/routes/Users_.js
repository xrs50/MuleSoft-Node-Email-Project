var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/', function(req, res, next){
    User.addNewUser(req.body, function(err, count){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(req.body);
        }
    });
});

router.get('/', function(req, res, next){
    User.getAllUsers(function(err, rows){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(rows)
        }
    });
});


router.post('/verifyuser', function(req, res, next){
    User.findUser(req.body.username, function(err, count){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(req.body);
            console.log(req.body);
        }
    });
})
module.exports=router;