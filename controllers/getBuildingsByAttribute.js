const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');


router.get('/byattributte', (req, res) => {
    
    const numberFound = buildings.some(building => building[req.query.attribute] === parseInt(req.query.value));
    const stringFound = buildings.some(building => building[req.query.attribute] === req.query.value);
    
    if(numberFound){
        res.json(buildings.filter(building => building[req.query.attribute] === parseInt(req.query.value)));
    } else if(stringFound){
        res.json(buildings.filter(building => building[req.query.attribute] === (req.query.value)));
    } else {
        res.status(404).json({msg: `No building with ${req.query.value} as ${req.query.attribute}`});
    }
});

module.exports = router;