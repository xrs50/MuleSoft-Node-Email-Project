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
module.exports=router;