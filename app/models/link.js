var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// create a schema
var linkSchema = mongoose.Schema({
  url: { type: String, required: true },
  base_url: String,
  code:  String,
  title: String,
  visits:  Number,
  created_at: Date,
  updated_at: Date
});

// assign default values
var Link = mongoose.model('Link', linkSchema);

// create hash for the incoming urls:
  // use crypto's createHash method w formula SHa 1
  // return the hash and DIGEST??????????? and slice
var createSha = function (url) {  
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
  
};
// before every save event of this link,
// create a sha has for the url and set this link's code to equal that nash
// then move onto next action
linkSchema.pre('save', function(next){
  var code = createSha(this.url)
  this.code = code
  next();
})

module.exports = Link;


