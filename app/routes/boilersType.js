const boilersType = require('../controllers/boilersType.js');
var router = require('express').Router();

// Retrieve all types
router.get('/', boilersType.findAll);

// Create a new type
router.post('/', boilersType.create);

// Retrieve types by attribute
router.get('/atr', boilersType.filter);

// Retrieve a single type with id
router.get('/:_id', boilersType.findOne);

// Update a type with id
router.put('/:id', boilersType.update);

// Delete a type with id
router.delete('/:id', boilersType.delete);

module.exports = router;