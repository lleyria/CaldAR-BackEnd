const { route } = require('./boilers');
const boilersRouter = require('./boilers');

var router = require("express").Router();

router.use('/boilers', boilersRouter);
module.exports = router;
