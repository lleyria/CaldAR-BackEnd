var admin = require("firebase-admin");

var serviceAccount = require("../../app-caldar-firebase-adminsdk-gtrk7-1fb1b547a7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = firebaseApp;