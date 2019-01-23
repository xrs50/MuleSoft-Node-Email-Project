var db = require('../dbconnection');

var Email = {

    getAllEmailsForUser: function(username, callback){
        return db.query("Select * from emails where username=?", [username], callback);
    },
    getEmailById: function(id, callback){
        return db.query("Select * from emails where ID =?", [id], callback);
    },
    sendNewEmail: function(Email, callback){
        return db.query("Insert into emails values (?, ?, ?, ?)", [Email.from1, Email.to1, Email.subject, Email.body], callback);
    },
    deleteEmail: function(id, callback){
        return db.query("update emails set deleted = 1 where ID = ?", [id], callback);
    }
    
};
module.exports=Email;