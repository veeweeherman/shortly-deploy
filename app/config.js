var mongoose = require('mongoose');
// set up default and prefered URI when using mongo
mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost:4568/shortlydb';

mongoose.connect(mongoURI);
// declares use of mongo's db when using this connection 
var db = mongoose.connection;

// sets default error messages on connection failures
db.on('error', console.error.bind(console, 'connection error:'));
// do this once when connection is open
db.once('open', function () {
 console.log('Mongodb connection open');
});



module.exports = db;