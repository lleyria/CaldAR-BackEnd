const boilers = require('../controllers/boilers.js');
var router = require('express').Router();

// Retrieve all boilers
router.get('/', boilers.findAll);

// Retrieve a single boiler with id
router.get('/', boilers.findOne);

// Create a new boiler
router.post('/', boilers.create);

// Retrieve boilers by attribute
router.get('/', boilers.filter);

// Update a boiler with id
router.put('/', boilers.update);

// Delete a boiler with id
router.delete('/', boilers.delete);

module.exports = router;