const techniciansRouter = require("./technicians");
const router = require("express").Router();

router.use("/technicians", techniciansRouter);

module.exports = router;
