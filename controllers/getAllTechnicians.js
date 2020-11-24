const express = require("express");
const router = express.Router();
const techniciansData = require("../data/technicians_mock_data");

router.get("/", (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    res.json(techniciansData);
  } else {
    next();
  }
});

module.exports = router;
