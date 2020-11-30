const boilers = require('../controllers/boilers.js');
var router = require('express').Router();

// Retrieve all boilers
router.get('/', boilers.findAll);

// Create a new boiler
router.post('/', boilers.create);

// Retrieve a single boiler with id
router.get('/:_id', boilers.findOne);

// Update a boiler with id
router.put('/:_id', boilers.update);

module.exports = router;