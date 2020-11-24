const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
const fs = require('fs');
 router.delete('/', (req, res) => {
    if(Object.keys(req.query).length === 0) {
        //to make sure customers call keeps working
        res.json({msg: 'No customer was deleted', customers});         
        } else{
            const found = customers.some(customer => customer.id === parseInt(req.query.id));
            if(found){                
                const removedItem = customers.filter(customer => customer.id !== parseInt(req.query.id));                
                fs.writeFileSync(path.join(__dirname, '../data/CUSTOMER_DATA.json'), JSON.stringify(removedItem));
                res.json({
                    msg: `Deleted customer with the id of ${req.query.id}`,                      
                    removedItem
                });
            } else {
                res.status(404).json({msg: `we cannot find the customer with the id  ${req.query.id}`});
            }        
        }
 }); 
module.exports = router;