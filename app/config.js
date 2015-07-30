var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect();
db = mongoose.connection;





module.exports = db;
// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });
