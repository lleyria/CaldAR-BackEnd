const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
const { response } = require('express');
//by attribute
router.get('/:attribute/:value', (req, res) => {
    // const numberFound = customers.some(customer => customer[req.query.attribute] === parseInt(req.query.value));
    // const stringFound = customers.some(customer => customer[req.query.attribute] === req.query.value);
    // console.log('req.query.attribute', req.query.attribute);
    // console.log('req.query.value', req.query.value);


    // if(Object.keys(req.query).length === 0) {
    //     res.json(customers)
    // } else{
    //     console.log('req.query', req.query);
    //     const found = customers.some(customer => customer.id === parseInt(req.query.id));
    //     if(found){
    //         res.json(customers.filter(customer => customer.id === parseInt(req.query.id)));
    //     } else {
    //         res.status(404).json({msg: `we cannot find the customer with the id  ${req.query.id}`});
    //     }
        
    // }
});













// router.get('/', (req, res) => {
//     if(Object.keys(req.query).length === 0) {
//         res.json(customers)
//     } else{
//         console.log('req.query', req.query);
//         const found = customers.some(customer => customer.id === parseInt(req.query.id));
//         if(found){
//             res.json(customers.filter(customer => customer.id === parseInt(req.query.id)));
//         } else {
//             res.status(404).json({msg: `we cannot find the customer with the id  ${req.query.id}`});
//         }
        
//     }
// });




module.exports = router;






