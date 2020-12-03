const technicians = require("../controllers/technicians");
const router = require("express").Router();

// Retrieve all technicians
router.get("/", technicians.findAll);

// Retrieve a single technician with id
router.get("/", technicians.findById);

// Get all technicians with a specific attribute
router.get("/", technicians.findByAttribute);

// Create a new technician
router.post("/", technicians.create);

// Update a technician with id
router.put("/", technicians.update);

// Delete technician with id
router.delete("/", technicians.delete);

module.exports = router;
