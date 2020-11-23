const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
//get customer by attribute



//by attribute
router.get('/:attribute/:value', (req, res) => {
    
    const numberFound = customers.some(customer => customer[req.params.attribute] === parseInt(req.params.value));
    const stringFound = customers.some(customer => customer[req.params.attribute] === req.params.value);
    
    if(numberFound){
        res.json(customers.filter(customer => customer[req.params.attribute] === parseInt(req.params.value)));
    } else if(stringFound){
        res.json(customers.filter(customer => customer[req.params.attribute] === (req.params.value)));
    } else {
        res.status(404).json({msg: `No value for ${req.params.value} or attribute like  ${req.params.attribute}`});
    }
});

module.exports = router;






