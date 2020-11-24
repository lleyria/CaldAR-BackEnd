const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const techniciansData = require("../data/technicians_mock_data.json");

router.get("/", (req, res, next) => {
  if (
    Object.keys(req.query).includes("id") &&
    Object.keys(req.query).includes("action") &&
    req.query.action === "delete"
  ) {
    const found = techniciansData.some((technician) => technician.id === parseInt(req.query.id));
    if (found) {
      const removeTechnician = techniciansData.filter((technician) => technician.id !== parseInt(req.query.id));
      console.log(removeTechnician);
      fs.writeFileSync(path.join(__dirname, "../data/technicians_mock_data.json"), JSON.stringify(removeTechnician));
      res.json(removeTechnician);
    } else {
      res.status(400).json({ msg: `No technician with the id of ${req.query.id}` });
    }
  } else {
    next();
  }
});

module.exports = router;
