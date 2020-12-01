const appointmentRouter = require("./appointments");
const router = require("express").Router();

router.use("/appointments", appointmentRouter);

module.exports = router;
