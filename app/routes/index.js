const { route } = require('./companies')
const companiesRouter = require('./companies');



var router = require("express").Router();

router.use('/companies', companiesRouter)
 
module.exports = router;
