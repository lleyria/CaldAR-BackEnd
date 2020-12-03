const appointmentsRouter = require("./appointments");
const router = require("express").Router();

router.use("/appointments", appointmentsRouter);

module.exports = router;
