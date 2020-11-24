const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers');
router.get('/', (req, res) => {
    console.log(req.query);
    if(Object.keys(req.query).length !== 0){
        res.json(boilers.filter(boiler => boiler[req.query.attribute] == req.query.value));
    }
});
module.exports = router;