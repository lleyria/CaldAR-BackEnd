const express = require('express');
const router = express.Router();
const boilerTypes = require('../data/boiler_types_mock_data.json');

router.get('/byattribute', (req, res) => {
    
    const numberFound = boilerTypes.some(boiler => boiler[req.query.attribute] === parseInt(req.query.value));
    const stringFound = boilerTypes.some(boiler => boiler[req.query.attribute] === req.query.value);
    
    if(numberFound){
        res.json(boilerTypes.filter(boiler => boiler[req.query.attribute] === parseInt(req.query.value)));
    } else if(stringFound){
        res.json(boilerTypes.filter(boiler => boiler[req.query.attribute] === (req.query.value)));
    } else {
        res.status(404).json({msg: `No boiler type with ${req.query.value} as ${req.query.attribute}`});
    }
});
module.exports = router;