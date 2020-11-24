const express = require("express");
const router = express.Router();
const appointmentsData = require("../data/appointment_mock_data.json");

router.get("/", (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    res.json(appointmentsData);
  } else {
    next();
  }
});

module.exports = router;
