const db = require("../models");
const Appointments = db.appointments;

// Retrieve all appointments from the database.
exports.findAll = (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
      Appointments.find({})
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving appointments.",
          });
        });
  } else {
    next();
  }
};

// Retrieve an appointment by its id.
exports.findById = (req, res, next) => {
  if (Object.keys(req.query).includes("id")) {
    Appointments.findById(req.query.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Some error occurred while retrieving appointment with id ${req.query.id}`,
        });
      });
  } else {
    next();
  }
};

// Get all appointments with a specific attribute
exports.findByAttribute = (req, res) => {
  Appointments.find({ [req.query.attribute]: req.query.value })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving appointment with attribute ${req.query.attribute}
          of value ${req.query.value}`,
      });
    });
};

// Create and save a new appointment.
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.building ||
    !req.body.boiler ||
    !req.body.technician ||
    !req.body.startTimeStamp ||
    !req.body.endTimeStamp ||
    !req.body.monthlyHours ||
    !req.body.status
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create new appointment
  const appointment = new Appointments({
    building: req.body.building,
    boiler: req.body.boiler,
    technician: req.body.technician,
    startTimeStamp: req.body.startTimeStamp,
    endTimeStamp: req.body.endTimeStamp,
    monthlyHours: req.body.monthlyHours,
    status: req.body.status
  });

  // Save appointment in the database
  appointment
    .save(appointment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the appointment.",
      });
    });
};

// Update an appointment with a specified id.
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }

  // Validate request
  if (
    !req.body.building ||
    !req.body.boiler ||
    !req.body.technician ||
    !req.body.startTimeStamp ||
    !req.body.endTimeStamp ||
    !req.body.monthlyHours ||
    !req.body.status
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  Appointments.findOneAndUpdate({ _id: req.query.id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update appointment with id ${req.query.id}. Verify that it exists`,
        });
      } else {
        res.send({ message: "Appointment was successfully updated" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating appointment with id ${req.query.id}`,
      });
    });
};

// Delete an appointment with a specified id.
exports.delete = (req, res) => {
  Appointments.findOneAndUpdate({ _id: req.query.id }, {status: 'cancelled'}, { useFindAndModify: false })
    .then((data) => {
      res.send(`Appointment with the id ${req.query.id} was successfully removed.`);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error removed appointment with id ${req.query.id}`,
      });
    });
};
