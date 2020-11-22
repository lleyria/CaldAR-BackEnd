const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');


router.get('/:attribute/:value', (req, res) => {
    
    const numberFound = buildings.some(building => building[req.params.attribute] === parseInt(req.params.value));
    const stringFound = buildings.some(building => building[req.params.attribute] === req.params.value);
    
    if(numberFound){
        res.json(buildings.filter(building => building[req.params.attribute] === parseInt(req.params.value)));
    } else if(stringFound){
        res.json(buildings.filter(building => building[req.params.attribute] === (req.params.value)));
    } else {
        res.status(404).json({msg: `No building with ${req.params.value} as ${req.params.attribute}`});
    }
});

module.exports = router;