const technician = require("../controllers/technicians");
const router = require("express").Router();

// Retrieve all technicians
router.get("/", technician.findAll);

// Retrieve a single technician with id
router.get("/", technician.findById);

// Get all technicians with a specific attribute
router.get("/", technician.findByAttribute);

// Create a new technician
router.post("/", technician.create);

// Update a technician with id
router.put("/", technician.update);

// Delete technician with id
router.delete("/", technician.delete);

module.exports = router;
