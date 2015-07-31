// var db = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
// why no bluebird????????????

// create a schema: why soln use mongoose.Scheme and not new Scheme???????????
var userSchema = mongoose.Schema({
  username: { type: String, required: true, /*undex: {unique:true in here instead}*/unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

// we need to create a model using it
var User = mongoose.model('User', userSchema);

// create method that takes compares (w bcrypt) the candidatePassword and the savedPassword
// the bcrypt compare method uses a callback to handle success and error notifications
User.comparePassword = function(candidatePassword, savedPassword, callback) {
    bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
      if (err) {return callback(err)};
      callback(null, isMatch); //null is first param bc there was no error in the else case
    });
};
// use mongoose' pre/save to declare before a save event:
// create the hash 
// return the hashes password
// use promise to store pass word and move onto next action
userSchema.pre('save', function () {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});

// make this available to our users in our Node applications
module.exports = User;
