const db = require("../models");
const technicians = require("../models/technicians");
const Technician = db.technicians;

// Retrieve all technicians from the database.
exports.findAll = (req, res) => {
  Technician.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving technicians.",
      });
    });
};

// Retrieve a technician with a specified id.
exports.findById = (req, res) => {
  Technician.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving technician with id ${req.params.id}`,
      });
    });
};

// Get all technicians with a specified attribute.
exports.findByAttribute = (req, res) => {
  Technician.find({ [req.params.attribute]: req.params.value })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving technician with attribute ${req.params.attribute}
           of value ${req.params.value}`,
      });
    });
};

// Create and save a new technician.
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.boilersTypeId ||
    !req.body.professionalLevel ||
    !req.body.hourRate ||
    !req.body.monthlyCapacity
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create new technician
  const technician = new Technician({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    boilersTypeId: req.body.boilersTypeId,
    professionalLevel: req.body.professionalLevel,
    hourRate: req.body.hourRate,
    monthlyCapacity: req.body.monthlyCapacity,
  });

  // Save technician in the database
  technician
    .save(technician)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the technician.",
      });
    });
};

// Delete a technician with a specified id.
exports.delete = (req, res) => {
  Technician.findOneAndRemove({ _id: req.params.id }, { useFindAndModify: false })
    .then((data) => {
      res.send(`Technician with the id ${req.params.id} was successfully removed.`);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error removed technician with id ${req.params.id}`,
      });
    });
};

// Update a technician with a specified id.
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }

  // Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.boilersTypeId ||
    !req.body.professionalLevel ||
    !req.body.hourRate ||
    !req.body.monthlyCapacity
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  Technician.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update technician with id ${req.params.id}. Verify that it exists`,
        });
      } else {
        res.send({ message: "Technician was successfully updated" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating technician with id ${req.params.id}`,
      });
    });
};
