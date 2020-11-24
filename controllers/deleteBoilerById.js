const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
const fs = require('fs');
const path = require('path');
router.get('/', (req, res, next) => {
    if(
        Object.keys(req.query).includes("id") &&
        Object.keys(req.query).includes("action") &&
        req.query.action === "delete"
        ){
        const found = boilers.some(boilers => boilers.id === parseInt(req.query.id));
        if(found){
            const removeItem = boilers.filter(boilers => boilers.id !== parseInt(req.query.id));
            fs.writeFileSync(path.join(__dirname, '../data/boilers.json'), JSON.stringify(removeItem));
            res.json(removeItem);
        } else {
            res.status(400).json({msg: `No boilers with the id of ${req.query.id}`});
        }
    } else {
        next();
    }
});
module.exports = router;