const boilers = require('../controllers/boilers.js');
var router = require('express').Router();
const authMiddleware = require("../Middleware/authMiddleware");

// Retrieve all boilers
router.get('/', authMiddleware, boilers.findAll);

// Retrieve a single boiler with id
router.get('/', authMiddleware, boilers.findOne);

// Create a new boiler
router.post('/', authMiddleware, boilers.create);

// Retrieve boilers by attribute
router.get('/', authMiddleware, boilers.filter);

// Update a boiler with id
router.put('/', authMiddleware, boilers.update);

// Delete a boiler with id
router.delete('/', authMiddleware, boilers.delete);

module.exports = router;