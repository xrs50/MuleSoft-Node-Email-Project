var db = require('../dbconnection');

var User = {

    addNewUser: function(User, callback){
        return db.query("Insert into users values(?,?)", [User.username, User.password], callback);
    },
    getAllUsers: function(callback){
        return db.query("Select * from users", callback);
    },
    findUser: function(User, callback){
        return db.query("Select * from users where username = ?", [User.Username], callback);
    },
    verifyPassword: function(User, callback){
        return db.query("Select * from users where username = ? and password = ?", [User.Username, User.Password], callback);
    }
};
module.exports=User;