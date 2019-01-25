var express = require('express');
var router = express.Router();
var Email = require('../models/Email');

router.get('/inbox/:username', function(req, res, next){
    Email.getAllEmailsForUser(req.params.username, function(err, rows){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(rows)
            console.log(rows)
        }
    })
});

router.get('/inbox/:username/:id', function(req, res, next){
    Email.getEmailById(req.params.id, function(err, rows){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(rows)
        }
    })
});

router.post('/send', function(req, res, next){
    Email.sendNewEmail(req.body, function(err, count){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(req.body);
        }
    })
});

router.put('/delete/:id', function(req, res, next){
    Email.deleteEmail(req.params.id, function(err, rows){
        if(err)
        {
            res.json(err)
        }
        else{
            res.json(rows)
        }
    });
});
module.exports= router