const appointmentsRouter = require("./appointments");
const techniciansRouter = require("./technicians");
const router = require("express").Router();

router.use("/technicians", techniciansRouter);
router.use('/buildings', require('./buildings'));
router.use("/appointments", appointmentsRouter);

module.exports = router;
