var db = require('../dbconnection');

var Email = {

    getAllEmailsForUser: function(username, callback){
        return db.query("Select * from emails where To1=? and Deleted = 0", [username], callback);
    },
    getEmailById: function(id, callback){
        return db.query("Select * from emails where ID =?", [id], callback);
    },
    sendNewEmail: function(Email, callback){
        return db.query("Insert into emails values ( NULL,?, ?, ?, ?, '0', '0')", [Email.From1, Email.To1, Email.Subject, Email.Body], callback);
    },
    deleteEmail: function(id, callback){
        return db.query("update emails set deleted = '1' where ID = ?", [id], callback);
    }
    
};
module.exports=Email;