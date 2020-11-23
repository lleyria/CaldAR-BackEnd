const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
router.get('/', (req, res) => {
    if(Object.keys(req.query).length !== 0){
        const found = boilers.some(boilers => boilers.id === parseInt(req.query.id));
        if (found){
            res.json(boilers.filter(boilers => boilers.id === parseInt(req.query.id)));
        } else {
            res.status(400).json({msg: `No boilers with the id of ${req.query.id}`});
        }
    } else {
        res.status(400).json({msg: `Error id: ${req.query}`});
    }
});

module.exports = router;