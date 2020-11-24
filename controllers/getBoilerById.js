const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
router.get('/', (req, res, next) => {
    if(
        Object.keys(req.query).includes("id") &&
        Object.keys(req.query).includes("action") &&
        req.query.action === "find"
    ){
        const found = boilers.some(boilers => boilers.id === parseInt(req.query.id));
        if (found){
            res.json(boilers.filter(boilers => boilers.id === parseInt(req.query.id)));
        } else {
            res.status(400).json({msg: `No boilers with the id of ${req.query.id}`});
        }
    } else {
        next();
    }
});

module.exports = router;