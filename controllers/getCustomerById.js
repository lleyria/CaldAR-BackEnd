  const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
router.get('/', (req, res) => {
    if(Object.keys(req.query).length === 0) {
        //to make sure customers call keeps working
            res.json(customers)
        } else{
            console.log('req.query', req.query);
            const found = customers.some(customer => customer.id === parseInt(req.query.id));
            if(found){
                res.json(customers.filter(customer => customer.id === parseInt(req.query.id)));
            } else {
                res.status(404).json({msg: `we cannot find the customer with the id  ${req.query.id}`});
            }        
        }
    });
module.exports = router;