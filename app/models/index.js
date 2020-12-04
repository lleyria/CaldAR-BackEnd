mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://admin:admin123@clustercaldar.9cacc.mongodb.net/CaldAR?retryWrites=true&w=majority";
db.companies = require("./companies.js")(mongoose); 

db.boilers = require('./boilers')(mongoose);
db.appointments = require("./appointments.js")(mongoose);
db.buildings = require("./buildings")(mongoose);
db.technicians = require("./technicians.js")(mongoose);

db.boilersType = require('./boilersType.js')(mongoose);

module.exports = db;
