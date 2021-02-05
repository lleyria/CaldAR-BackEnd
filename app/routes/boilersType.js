const boilersType = require('../controllers/boilersType');
var router = require('express').Router();
const authMiddleware = require("../Middleware/authMiddleware");

// Retrieve all types
router.get('/', authMiddleware, boilersType.findAll);

// Retrieve a single type with id
router.get('/', authMiddleware, boilersType.findOne);

// Create a new type
router.post('/', authMiddleware, boilersType.create);

// Retrieve types by attribute
router.get('/', authMiddleware, boilersType.filter);

// Update a type with id
router.put('/', authMiddleware, boilersType.update);

// Delete a type with id
router.delete('/', authMiddleware, boilersType.delete);

module.exports = router;