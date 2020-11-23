const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
router.get('/', (req, res) => {
    if(Object.keys(req.query).length === 0){
        res.json(boilers)
    } else {
        res.status(404).json({msg: 'Boilers not found'});
    }
});
module.exports = router;