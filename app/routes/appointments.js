const appointment = require("../controllers/appointments");
const router = require("express").Router();

// Retrieve all appointments
router.get("/", appointment.findAll);

// Retrieve a single appointment with id
router.get("/", appointment.findById);

// Get all appointments with a specific attribute
router.get("/", appointment.findByAttribute);

// Create a new appointment
router.post("/", appointment.create);

// Update a appointment with id
router.put("/", appointment.update);

// Delete appointment with id
router.delete("/", appointment.delete);

module.exports = router;
