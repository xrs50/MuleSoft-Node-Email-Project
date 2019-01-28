var express = require('express');
var router = express.Router();
var User = require('../models/User');
var http = require('http')
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

router.post('/mulesoftlogin', function(req, res, next){
    var username = req.body.Username;
    var password = req.body.Password;
    console.log(username + password);

    var data = JSON.stringify({
        Username: username,
        Password: password
    });

    var options = {
        host: 'localhost',
        port: '3001',
        path:'/login',
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    };

    var httpReq = http.request(options, function(mulesoftRes){
        mulesoftRes.setEncoding('utf-8');
        mulesoftRes.on('data', function(chunk){
            console.log("Mulesoft login has received: " +chunk);
        });
        mulesoftRes.on('end', function(){
            console.log("mulesoft login done");
        })
    })

    httpReq.write(data);
    httpReq.end();
})

router.post('/verifyuser', function(req, res, next){
    User.findUser(req.body.username, function(err, count){
        var name = req.body.username
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(req.body.username);
            console.log("The response from MuleSoft is: "+req.body.username);
            
        }
    });
})
module.exports=router;