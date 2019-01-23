var db = require('../dbconnection');

var User = {

    addNewUser: function(User, callback){
        return db.query("Insert into users values(?,?)", [User.username, User.password], callback);
    }
};
module.exports=User;