const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');
const path = require('path');
const fs = require('fs');

router.delete('/', (req, res) => {
    
    const found = buildings.some(building => building.id === parseInt(req.query.id));
    
    if(found){
        const removedItem = buildings.filter(building => building.id !== parseInt(req.query.id))
        fs.writeFileSync(path.join(__dirname,'../data/buildings_mock_data_test'), JSON.stringify(removedItem))
        res.json(removedItem); 
    } else {
        res.status(404).json({msg: `No building with the ID of ${req.query.id}`});
    }
});

module.exports = router;