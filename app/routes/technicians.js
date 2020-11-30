const technician = require("../controllers/technicians.js");

var router = require("express").Router();

// Retrieve all technicians
router.get("/", technician.findAll);

// Create a new technician
router.post("/", technician.create);

// Retrieve a single technician with id
router.get("/:id", technician.findById);

// Update a technician with id
router.put("/:id", technician.update);

// Delete technician with id
router.delete("/:id", technician.delete);

// Get all technicians with a specific attribute
router.get("/:attribute/:value", technician.findByAttribute);

module.exports = router;
