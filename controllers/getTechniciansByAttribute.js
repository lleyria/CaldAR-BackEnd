const express = require("express");
const router = express.Router();
const techniciansData = require("../data/technicians_mock_data");

router.get("/", (req, res) => {
  if (Object.values(req.query).includes("skillsId") || Object.values(req.query).includes("typeIds")) {
    res.json(
      techniciansData.filter((technician) => technician[req.query.attribute].includes(parseInt(req.query.value)))
    );
  } else if (req.query.value !== "skillsId" && req.query.value !== "typeIds") {
    const found = techniciansData.some((technician) => technician[req.query.attribute] == req.query.value);
    if (found) {
      res.json(techniciansData.filter((technician) => technician[req.query.attribute] == req.query.value));
    } else {
      res.status(404).json({ msg: `No technicians with ${req.query.attribute} of ${req.query.value}` });
    }
  }
});

module.exports = router;
