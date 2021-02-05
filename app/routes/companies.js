const companies = require("../controllers/companies.js");


var router = require("express").Router();

 //Get all companies
 router.get("/", authMiddleware, companies.findAll);

//Get one company (by id)
router.get("/", authMiddleware, companies.findOne);

//Add a new company
router.post("/", authMiddleware, companies.create);

//Update an existing company
router.put("/", authMiddleware, companies.update);

//Delete a company (by id)
router.delete("/", authMiddleware, companies.deleteOne);

//Get all companies with a specific attribute. (i.e: All companies called "T-Mobile")
router.get("/", authMiddleware, companies.getByAttribute);

module.exports = router;