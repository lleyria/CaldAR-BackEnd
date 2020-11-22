const express = require('express');
const techniciansData = require('../data/technicians_mock_data');

const router = express.Router();

// getAllTechnicians
router.get('/', (req, res) => res.json(techniciansData));

// getTechnicianById
router.get('/:id', (req, res) => {
  const found = techniciansData.some(technician => technician.id === parseInt(req.params.id));

  if (found) {
    res.json(techniciansData.filter(technician => technician.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No technician with the id of ${req.params.id}`});
  }
});

// getTechniciansByAttribute
router.get('/:attribute/:value', (req, res) => {
  res.json(techniciansData.filter(technician => technician[req.params.attribute] == req.params.value));
});

// deleteTechnicianById
router.delete('/:id', (req, res) => {
  const found = techniciansData.some(technician => technician.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Technician deleted', 
      techniciansData: techniciansData.filter(technician => technician.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No technician with the id of ${req.params.id}`});
  }
});

module.exports = router;
