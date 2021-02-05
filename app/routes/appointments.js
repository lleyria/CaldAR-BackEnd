const appointments = require("../controllers/appointments");
const router = require("express").Router();
const authMiddleware = require("../Middleware/authMiddleware");

// Retrieve all appointments
router.get("/", authMiddleware, appointments.findAll);

// Retrieve a single appointment with id
router.get("/", authMiddleware, appointments.findById);

// Get all appointments with a specific attribute
router.get("/", authMiddleware, appointments.findByAttribute);

// Create a new appointment
router.post("/", authMiddleware, appointments.create);

// Update a appointment with id
router.put("/", authMiddleware, appointments.update);

// Delete appointment with id
router.delete("/", authMiddleware, appointments.delete);

module.exports = router;
