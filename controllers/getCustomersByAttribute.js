const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
//by attribute
router.get('/', (req, res) => {
    if(Object.keys(req.query).length === 0) {
        //to make sure customers call keeps working
        res.json(customers)
        console.log(req.query);
        } else{
            res.json(customers.filter.apply(customer => customer[req.query.attribute] == req.query.value));            
        }
});
module.exports = router;