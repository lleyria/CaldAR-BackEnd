const technicians = require("../controllers/technicians");
const router = require("express").Router();
const authMiddleware = require("../Middleware/authMiddleware");

// Retrieve all technicians
router.get("/", authMiddleware, technicians.findAll);

// Retrieve a single technician with id
router.get("/", authMiddleware, technicians.findById);

// Get all technicians with a specific attribute
router.get("/", authMiddleware, technicians.findByAttribute);

// Create a new technician
router.post("/", authMiddleware, technicians.create);

// Update a technician with id
router.put("/", authMiddleware, technicians.update);

// Delete technician with id
router.delete("/", authMiddleware, technicians.delete);

module.exports = router;
