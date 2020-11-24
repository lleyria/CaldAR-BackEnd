const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
router.get('/', (req, res, next) => {
        if(Object.keys(req.query).length === 0){
            res.json(boilers)
        } else {
            next();
        }
});
module.exports = router;