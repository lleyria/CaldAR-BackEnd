const router = require('express').Router();
const building = require('../controllers/buildings')

//Get all buildings
router.get('/', building.findAll);

//Get building by id
router.get('/byid', building.findOne);

//Create new building
router.post('/', building.create);

//Update a building
router.put('/', building.update);

//Delete a building
router.delete('/', building.delete);

//Get buildings by Attr
router.get('/byattr', building.filter);

module.exports = router;

