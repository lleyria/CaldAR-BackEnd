//creates conflict with getCustomersById
const path = require('path');
const express = require('express');
const router = express.Router();
const customers = require('../data/CUSTOMER_DATA.json');
router.get('/', (req, res) => res.json(customers));
module.exports = router;