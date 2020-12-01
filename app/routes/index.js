const { route } = require('./companies')
const companyRouter = require('./companies');



var router = require("express").Router();

router.use('/companies', companyRouter)
 
module.exports = router;
