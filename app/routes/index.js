const { route } = require('./boilersType.js');
const boilersTypeRouter = require('./boilersType.js');

var router = require("express").Router();

router.use('/boilersType', boilersTypeRouter);
module.exports = router;