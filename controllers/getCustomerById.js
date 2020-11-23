const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');

router.get('/:id', (req, res) =>{
    const found = customers.some(customer => customer.id === parseInt(req.params.id));
    if(found){
        res.json(customers.filter(customer => customer.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `We cannot find the customer with the Id of ${req.params.id}`});
    }
    
});




module.exports = router;