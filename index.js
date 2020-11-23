//const for the index (seba20sa)
const express = require('express');
const app = express();
const path = require('path');
//api calls
/* coment all customers due to conflict with getCustomersById
 const getAllCustomers = require('./controllers/getAllCustomers');*/
const getCustomerById = require('./controllers/getCustomerById');
// const getCustomersByAttribute = require('./controllers/getCustomersByAttribute');
const deleteCustomerById = require('./controllers/deleteCustomerById');
//url path
/* coment all customers due to conflict with getCustomersById 
 app.use('/api/customers', getAllCustomers);*/
// app.use('/api/customers/byAttribute', getCustomersByAttribute);
app.use('/api/customers', getCustomerById);
app.use('/api/customers', deleteCustomerById);
//listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));