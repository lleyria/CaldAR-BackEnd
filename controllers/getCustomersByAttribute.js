const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
//by attribute



router.get('/', (req, res) => {
    //testing
    console.log(req.query);
    if(Object.keys(req.query).length !== 0){
        res.json(customers.filter(customer => customer[req.query.attribute] == req.query.value));
    } else {
        res.status(404).json({msg: `Wrong query input`});
    }
});
module.exports = router;