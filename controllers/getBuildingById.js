const { query } = require('express');
const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');

router.get('/', (req, res) => {
        const found = buildings.some(building => building.id === parseInt(req.query.id));
        if(found){
            console.log(req.query)
            res.json(buildings.filter(building => building.id === parseInt(req.query.id))); 
        } else {
            res.status(404).json({msg: `No building with the ID of ${req.query.id}`});
        }
    });
module.exports = router;