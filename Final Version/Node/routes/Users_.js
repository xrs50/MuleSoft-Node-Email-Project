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
var loginData;
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
            loginData = JSON.parse(chunk);
            console.log("parsed string is: "+loginData);
        });
        mulesoftRes.on('end', function(){
            console.log("mulesoft login done");
            User.findUser(loginData, function(err, count){
                console.log(loginData.Username)
                if(err)
                {
                    //res.json(err);
                    console.log(err);
                }
                else{
                    //res.json(count);
                    console.log("Accounts existing with this name: " + count.length);
                    if(count.length === 0){
                        
                        res.redirect('/createAccount');
                    }
                    else{
                        res.redirect('http://localhost:3000/Users_/verifyPassword');
                    }
                }
            })
        })
    })
    

    httpReq.write(data);
    httpReq.end();
})

router.get('/verifyPassword', function(req, res, next){
    User.verifyPassword(loginData, function(err, count){
        
        if(err)
        {
            //res.json(err)
        }
        else{
            var validPassword = count.length;
            //res.json(count);
            console.log("Does the password match the account?:" + count.length);
            
            var data = JSON.stringify({
                valid: validPassword
            });
            var options = {
                host: 'localhost',
                port: '3001',
                path:'/validPassword',
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            };
            var validLogin;
            var httpReq = http.request(options, function(mulesoftRes){
                mulesoftRes.setEncoding('utf-8');
                mulesoftRes.on('data', function(chunk){
                    console.log("Mulesoft password checker has received: " +chunk);
                    validLogin = chunk;
                });
                mulesoftRes.on('end', function(){
                    if(validLogin === "valid"){
                        res.send("You have logged in and emails will be displayed here");
                    }
                    else{
                        
                        res.redirect('/login')
                    }

                })
            });
            httpReq.write(data);
            httpReq.end();
        }
    });

    
})
module.exports=router;