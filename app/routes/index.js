const router = require("express").Router();

router.use('/buildings', require('./buildings'));

module.exports = router;
