const express = require('express');
const router = express.Router();
const boilerTypes = require('../data/boiler_types_mock_data.json');

router.get('/', (req, res) => {
        const found = boilerTypes.some(boiler => boiler.id === parseInt(req.query.id));
        if(found){
            console.log(req.query)
            res.json(boilerTypes.filter(boiler => boiler.id === parseInt(req.query.id))); 
        } else {
            res.status(404).json({msg: `No boiler type with the ID of ${req.query.id}`});
        }
    });
module.exports = router;