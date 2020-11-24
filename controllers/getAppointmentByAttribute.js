const express = require("express");
const router = express.Router();
const appointmentsData = require("../data/appointment_mock_data");

router.get("/", (req, res) => {
    const found = appointmentsData.some((appointment) => appointment[req.query.attribute] == req.query.value);
    if (found) {
      res.json(appointmentsData.filter((appointment) => appointment[req.query.attribute] == req.query.value));
    } else {
      res.status(404).json({ msg: `No appointments with ${req.query.attribute} of ${req.query.value}` });
    }
});

module.exports = router;
