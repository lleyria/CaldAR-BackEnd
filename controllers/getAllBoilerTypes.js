const express = require('express');
const router = express.Router();
const boilerTypes = require('../data/boiler_types_mock_data.json');

router.get('/all', (req, res) => res.json(boilerTypes));

module.exports = router;