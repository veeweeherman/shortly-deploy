// var db = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

// we need to create a model using it
var User = mongoose.model('User', userSchema);

userSchema.methods.initialize = function () {
    this.on('creating', this.hashPassword);
    this.save(function(err) {
      if (err) {throw err;} 
      else {console.log('User saved successfully!';}
    });
};
//TODO can it use 'get?' here?
userSchema.methods.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
};

userSchema.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

// make this available to our users in our Node applications
module.exports = User;




/** BEFORE MONGO ****************************/
// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
