const express = require('express');
const router = express.Router();
const boilerTypes = require('../data/boiler_types_mock_data.json');
const path = require('path');
const fs = require('fs');

router.delete('/', (req, res) => {
    
    const found = boilerTypes.some(boiler => boiler.id === parseInt(req.query.id));
    
    if(found){
        const removedItem = boilerTypes.filter(boiler => boiler.id !== parseInt(req.query.id))
        fs.writeFileSync(path.join(__dirname,'../data/boiler_types_mock_data_test.json'), JSON.stringify(removedItem))
        res.json(removedItem); 
    } else {
        res.status(404).json({msg: `No boiler type with the ID of ${req.query.id}`});
    }
});
module.exports = router;