const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
const idFilter = req => boilers => boilers.id === parseInt(req.params.id);
router.get('/:id', (req, res) => {
    console.log(req);
    const found = boilers.some(idFilter(req));
    if(found) {
        res.json(boilers.filter(idFilter(req)));
    } else {
        res.status(400).json({msg: `No boilers with the id of ${req.params.id}`});
    }
});
module.exports = router;