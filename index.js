//const for the index (seba20sa)
const express = require('express');
const app = express();
const path = require('path');
//api calls
//coment all customers due to conflict with getCustomersById
//const getAllCustomers = require('./controllers/getAllCustomers');
const getCustomerById = require('./controllers/getCustomerById');
const deleteCustomerById = require('./controllers/deleteCustomerById');
// const getCustomersByAttribute = require('./controllers/getCustomersByAttribute');
//url path
//  coment all customers due to conflict with getCustomersById 
//app.use('/api/customers', getAllCustomers);
app.use('/api/customers', getCustomerById);
app.use('/api/customers', deleteCustomerById);
// app.use('/api/customers', getCustomersByAttribute);
//listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));