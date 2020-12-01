const company = require("../controllers/companies.js");


var router = require("express").Router();

// //Get all companies
 router.get("/", company.findAll);

// //Get one company (by id)
router.get("/getById/:id", company.findOne);

//Add a new company
router.post("/", company.create);

//Update an existing company
router.put("/:id", company.update);

// //Delete a company (by id)
router.delete("/:id", company.deleteOne);

//Get all companies with a specific attribute. (i.e: All companies called "T-Mobile")
router.get("/getByAttribute", company.getByAttribute);

module.exports = router;