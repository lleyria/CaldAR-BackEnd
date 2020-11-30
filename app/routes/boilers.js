const boilers = require('../controllers/boilers.js');
var router = require('express').Router();

//Retrieve all boilers
router.get('/', boilers.findAll);

module.exports = router;