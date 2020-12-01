const technicianRouter = require("./technicians");
const router = require("express").Router();

router.use("/technicians", technicianRouter);

module.exports = router;
