const express = require("express");
const router = express.Router();
const techniciansData = require("../data/technicians_mock_data");

router.get("/", (req, res, next) => {
  if (
    Object.keys(req.query).includes("id") &&
    Object.keys(req.query).includes("action") &&
    req.query.action === "delete"
  ) {
    const found = techniciansData.some((technician) => technician.id === parseInt(req.query.id));
    if (found) {
      res.json({
        msg: `Technician with the id of ${req.query.id} deleted`,
        techniciansData: techniciansData.filter((technician) => technician.id !== parseInt(req.query.id)),
      });
    } else {
      res.status(400).json({ msg: `No technician with the id of ${req.query.id}` });
    }
  } else {
    next();
  }
});

module.exports = router;
