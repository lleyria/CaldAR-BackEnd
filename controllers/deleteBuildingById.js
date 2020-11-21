const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');

router.delete('/:id', (req, res) => {
    
    const found = buildings.some(building => building.id === parseInt(req.params.id));
    
    if(found){
        res.json({msg: 'Member Deleted',
        members: buildings.filter(building => building.id !== parseInt(req.params.id))}); 
    } else {
        res.status(404).json({msg: `No building with the ID of ${req.params.id}`});
    }
});

module.exports = router;