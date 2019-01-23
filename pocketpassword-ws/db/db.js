const mongo = require('mongoose');
let dev_db_url = 'mongodb://pp:123456789@localhost:27017/PocketPasswordDB';

mongo.connect(dev_db_url);
mongo.Promise = global.Promise;

let mongodb = mongo.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.dbconnection = mongodb;

