const appointmentsRouter = require("./appointments");
const techniciansRouter = require("./technicians");
const boilersRouter = require('./boilers');
const companiesRouter = require('./companies');
const boilersTypeRouter = require("./boilersType");

const router = require("express").Router();

router.use("/technicians", techniciansRouter);
router.use('/buildings', require('./buildings'));
router.use("/appointments", appointmentsRouter);
router.use('/boilers', boilersRouter);
router.use('/companies', companiesRouter)
router.use("/boilersType", boilersTypeRouter);

module.exports = router;
