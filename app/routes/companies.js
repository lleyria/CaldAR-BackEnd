const companies = require("../controllers/companies.js");


var router = require("express").Router();

 //Get all companies
 router.get("/", companies.findAll);

//Get one company (by id)
router.get("/", companies.findOne);

//Add a new company
router.post("/", companies.create);

//Update an existing company
router.put("/", companies.update);

//Delete a company (by id)
router.delete("/", companies.deleteOne);

//Get all companies with a specific attribute. (i.e: All companies called "T-Mobile")
router.get("/", companies.getByAttribute);

module.exports = router;