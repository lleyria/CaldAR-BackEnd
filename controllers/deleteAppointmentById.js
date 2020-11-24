const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const appointmentsData = require("../data/appointment_mock_data.json");

router.get("/", (req, res, next) => {
  if (
    Object.keys(req.query).includes("id") &&
    Object.keys(req.query).includes("action") &&
    req.query.action === "delete"
  ) {
    const found = appointmentsData.some(appointment => appointment.id === parseInt(req.query.id));
    if (found) {
      const removeAppointment = appointmentsData.filter(appointment => appointment.id !== parseInt(req.query.id));
      fs.writeFileSync(path.join(__dirname, "../data/appointment_mock_data.json"), JSON.stringify(removeAppointment));
      res.json(removeAppointment);
    } else {
      res.status(400).json({ msg: `No appointment with the id of ${req.query.id}` });
    }
  } else {
    next();
  }
});

module.exports = router;
