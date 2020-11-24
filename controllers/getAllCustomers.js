//creates conflict with getCustomersById
const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
// router.get('/', (req, res) => res.json(customers));
router.get('/', (req, res) => {
    if(Object.keys(req.query).length === 0){
        res.json(customer)
    } else {        
        res.status(404).json({msg: 'list empty'});
    }
});
module.exports = router;