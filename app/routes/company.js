const company = require("../controllers/company");
const router = require("../controllers/company");

var router = require("express").Router();

//Get all companies
router.get("/", company.findAll);

//Get one company (by id)
router.get("/:id", company.findOne);

//Add a new company
router.post("/", company.create);

//Update an existing company
router.put("/:id", company.update);

//Delete a company (by id)
router.delete("/:id", company.delete);

//Get all companies with a specific attribute. (i.e: All companies called "T-Mobile")
// this one is tricky
router.get("/", company.getByAttribute);

module.exports = router;