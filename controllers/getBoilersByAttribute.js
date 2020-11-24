const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers');
router.get('/', (req, res) => {
    console.log(req.query);
    if(Object.keys(req.query).length !== 0){
        return res.json(boilers.filter(boiler => boiler[req.query.attribute] == req.query.value));
    } else {
        res.status(404).json({msg: `No funciona`});
    }
});
module.exports = router;