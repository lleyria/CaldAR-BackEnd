const { route } = require('./company')
const companyRouter = require('./company');



var router = require("express").Router();

router.use('/companies', companyRouter)
 
module.exports = router;
