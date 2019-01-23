var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));

//load index.html for when path is '/'
app.get('/', function(request, response){
    console.log("loading html form");
    response.sendFile('index.html', {"root": __dirname});
})

app.get('/emails/', function(request, response){
    console.log("loading all emails for this user");
    response.send("all emails will be here for"+request.query.user)
})

//extract username and password from the form if path is '/login'
app.post('/login', function(request, response){
    var username = request.body.username;
    var password= request.body.password;
    console.log("username is: "+username +" and password is: "+password);

    //converts into json format
    var data = JSON.stringify({
        user: username,
        pass: password
    });

    var options = {
        host: 'localhost',
        port: 8001,
        path: '/',
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    };
    var userdata ;
    var httpReq = http.request(options, function(responsePost){
        var valid = 1;
        responsePost.setEncoding('utf8');
        responsePost.on('data', function(chunk){
            console.log("body of receiving server: "+chunk);
            if(chunk === "invalid"){
                console.log("invalid login");
                valid = 0;
            }
            else{
                userdata = chunk;
                console.log("valid login");
                
            }
        });

        responsePost.on('end', function(){
            if(valid == 1){
                const query = querystring.stringify({
                    "user": userdata
                })
                //console.log(request.params.username)
                response.redirect("/emails/?" + query)
            }
            else{
                response.redirect("/")
            }
            //response.send('login request sent');
        })
    });

    httpReq.write(data);
    httpReq.end();

})

var port = 8000;
app.listen(port, function(){
    console.log("STARTED ON PORT: "+port);
})