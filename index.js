//const for the index (seba20sa)
const express = require('express');
const app = express();
const path = require('path');



//api calls
const getAllCustomers = require('./controllers/getAllCustomers');
const getCustomerById = require('./controllers/getCustomerById');
const getCustomersByAttribute = require('./controllers/getCustomersByAttribute');
const deleteCustomerById = require('./controllers/deleteCustomerById');
//url path 
app.use('/api/customers', getAllCustomers);
app.use('/api/customers/byId', getCustomerById);
app.use('/api/customers/byAttribute', getCustomersByAttribute);
app.use('/api/customers/delete', deleteCustomerById);
 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));