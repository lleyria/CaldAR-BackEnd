//const for the index (seba20sa)
const express = require('express');
const { request } = require('http');
const { response } = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// const for the data (seba20sa)
// const customerData = require('CUSTOMER_DATA');





app.listen(PORT, () => console.log(`listening to port ${PORT}`));