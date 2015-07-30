// var db = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// create a schema
var linkSchema = new Schema({
  url: { type: String, required: true },
  base_url: { type: String },
  code:  { type: String },
  title: { type: String },
  visits:  { type: Number },
  created_at: Date,
  updated_at: Date
});

// assign default values
var Link = mongoose.model('Link', userSchema);

// give methods
linkSchema.methods.initialize = function () {  
  this.on('creating', function(model, attrs, options){
    var shasum = crypto.createHash('sha1');
    shasum.update(model.get('url'));
    model.set('code', shasum.digest('hex').slice(0, 5));
  });
};

module.exports = Link;




/** BEFORE MONGO ****************************/
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// module.exports = Link;
