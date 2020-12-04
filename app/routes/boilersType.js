const boilersType = require('../controllers/boilersType');
var router = require('express').Router();

// Retrieve all types
router.get('/', boilersType.findAll);

// Retrieve a single type with id
router.get('/', boilersType.findOne);

// Create a new type
router.post('/', boilersType.create);

// Retrieve types by attribute
router.get('/', boilersType.filter);

// Update a type with id
router.put('/', boilersType.update);

// Delete a type with id
router.delete('/', boilersType.delete);

module.exports = router;