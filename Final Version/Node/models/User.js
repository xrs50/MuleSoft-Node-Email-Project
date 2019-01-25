var db = require('../dbconnection');

var User = {

    addNewUser: function(User, callback){
        return db.query("Insert into users values(?,?)", [User.username, User.password], callback);
    },
    getAllUsers: function(callback){
        return db.query("Select * from users", callback);
    },
    findUser: function(Username, callback){
        return db.query("Select * from users where username = ?", [Username], callback);
    }
};
module.exports=User;