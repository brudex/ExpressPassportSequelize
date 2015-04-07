"use strict";
var bcrypt=require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING

  }, {
    instanceMethods: {
      comparePassword: function(password, callback) {

         var match= bcrypt.compareSync(password, this.password);
          callback(null,match);
      },
      hashPass:function(){
         this.password=bcrypt.hashSync(this.password,8);
      }

    }

  });
  return User;
};
