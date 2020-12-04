const router = require('express').Router();
const buildings = require('../controllers/buildings')

//Get all buildings
router.get('/', buildings.findAll);

//Get building by id
router.get('/byid', buildings.findOne);

//Create new building
router.post('/', buildings.create);

//Update a building
router.put('/', buildings.update);

//Delete a building
router.delete('/', buildings.delete);

//Get buildings by Attr
router.get('/byattr', buildings.filter);

module.exports = router;

