const express = require('express');
const router = express.Router();
const boilers = require('../data/boilers.json');
router.get('/', (req, res) => res.json(boilers));
module.exports = router;