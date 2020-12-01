const { DBRef } = require("mongodb");

mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://admin:admin123@clustercaldar.9cacc.mongodb.net/CaldAR?retryWrites=true&w=majority";
db.company = require("./companies.js")(mongoose); 

module.exports = db;
