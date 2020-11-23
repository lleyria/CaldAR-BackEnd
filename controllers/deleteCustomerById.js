const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');



router.delete('/:id', (req, res) => {
    
    const found = customers.some(customer => customer.id === parseInt(req.params.id));
    
    if(found){
        res.json({
            msg: `Deleted customer with the id of ${req.params.id}`,                      
            customers: customers.filter(customer => customer.id !== parseInt(req.params.id))
        }); 
    } else {
        res.status(404).json({msg: `we cannot find the customer with the id  ${req.params.id}`});
    }
});

module.exports = router;