const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');

router.get('/', (req, res) => res.json(buildings));

module.exports = router;