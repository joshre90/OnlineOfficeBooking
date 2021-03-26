const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.booking = require('./booking.model');
db.company = require('./company.model');
//db.compdetails = require('./companydetails.model');
db.role = require('./role.model');
db.token = require('./token.model');

module.exports = db;
