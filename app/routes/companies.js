const companies = require("../controllers/companies.js");


var router = require("express").Router();

//Get all companies
 router.get("/", companies.findAll);

//Get one company (by id)
router.get("/getById/:id", companies.findOne);

//Add a new company
router.post("/", companies.create);

//Update an existing company
router.put("/:id", companies.update);

//Delete a company (by id)
router.delete("/:id", companies.deleteOne);

//Get all companies with a specific attribute. (i.e: All companies called "T-Mobile")
router.get("/getByAttribute", companies.getByAttribute);

module.exports = router;