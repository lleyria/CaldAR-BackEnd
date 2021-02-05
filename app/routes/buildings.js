const router = require('express').Router();
const buildings = require('../controllers/buildings');
const authMiddleware = require("../Middleware/authMiddleware");

//Get all buildings
router.get('/', authMiddleware, buildings.findAll);

//Get building by id
router.get('/byid', authMiddleware, buildings.findOne);

//Create new building
router.post('/', authMiddleware, buildings.create);

//Update a building
router.put('/', authMiddleware, buildings.update);

//Delete a building
router.delete('/', authMiddleware, buildings.delete);

//Get buildings by Attr
router.get('/byattr', authMiddleware, buildings.filter);

module.exports = router;

