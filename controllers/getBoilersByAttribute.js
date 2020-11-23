const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
router.get('/api/boilers', (req, res) => {
    if(Object.keys(req.query).length !== 0){
        const query = req.query;
        const field = Object.getOwnPropertyNames(query);
        const val = Object.values(query);
        console.log(field[0]);
        console.log(val[0]);
        const found = boilers.some(boilers => boilers[field[0]] === val[0]);
        console.log(found);
        if(found){
            res.json(boilers.filter(boilers => boilers[field[0]] === val[0]));
        } else {
            res.status(404).json({msg: `No boilers with ${field[0]} as ${val[0]}`});
        }
    }
});
module.exports = router;