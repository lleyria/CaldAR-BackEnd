const express = require("express");
const router = express.Router();
const appointmentsData = require("../data/appointment_mock_data");

router.get("/", (req, res, next) => {
  if (Object.keys(req.query).includes("id")) {
    const found = appointmentsData.some((appointment) => appointment.id === parseInt(req.query.id));
    if (found) {
      res.json(appointmentsData.filter((appointment) => appointment.id == req.query.id));
    } else {
      res.status(400).json({ msg: `No appointment with the id of ${req.query.id}` });
    }
  } else {
    next();
  }
});

module.exports = router;
