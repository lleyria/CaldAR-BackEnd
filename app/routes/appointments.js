const appointments = require("../controllers/appointments");
const router = require("express").Router();

// Retrieve all appointments
router.get("/", appointments.findAll);

// Retrieve a single appointment with id
router.get("/", appointments.findById);

// Get all appointments with a specific attribute
router.get("/", appointments.findByAttribute);

// Create a new appointment
router.post("/", appointments.create);

// Update a appointment with id
router.put("/", appointments.update);

// Delete appointment with id
router.delete("/", appointments.delete);

module.exports = router;
