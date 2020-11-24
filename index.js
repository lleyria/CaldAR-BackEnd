//const for the index (seba20sa)
const express = require('express');
const app = express();
const path = require('path');
// const getCustomersByAttribute = require('./controllers/getCustomersByAttribute');
//url paths
app.use('/api/customers/customerbyID', require('./controllers/getCustomerById'));
app.use('/api/customers/customerByID', require('./controllers/deleteCustomerById'));
app.use('/api/customers', require('./controllers/getAllCustomers'));
// app.use('/api/customers', getCustomersByAttribute);
//listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));