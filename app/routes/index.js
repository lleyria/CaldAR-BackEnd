
const router = require("express").Router();

router.use('/buildings', require('./buildings'));
const techniciansRouter = require("./technicians");

router.use("/technicians", techniciansRouter);

module.exports = router;
