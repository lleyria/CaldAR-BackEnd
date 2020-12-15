const db = require("../models");
const Technicians = db.technicians;
const Appointments = db.appointments;

// Retrieve all technicians from the database.
exports.findAll = (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    Technicians.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving technicians.",
        });
      });
  } else {
    next();
  }
};

// Retrieve a technician with a specified id.
exports.findById = (req, res, next) => {
  if (Object.keys(req.query).includes("id")) {
    Technicians.findById(req.query.id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
              msg: `Technicians with id ${req.query.id} was not found.`
          })
      }
      res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Some error occurred while retrieving technician with id ${req.query.id}`,
        });
      });
  } else {
    next();
  }
};

// Get all technicians with a specified attribute.
exports.findByAttribute = (req, res) => {
  Technicians.find({ [req.query.attribute]: req.query.value })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
            msg: `Technicians with ${req.query.value} as ${req.query.attr} were not found.`
        })
    }
    res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving technician with attribute ${req.query.attribute}
          of value ${req.query.value}`,
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
  const technician = new Technicians({
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
  Appointments.findOne({technician: req.query.id}).then((data) =>{
    if (data===null){
      Technicians.findOneAndRemove({ _id: req.query.id }, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete technician with id=${id}.`
          });
        } 
        res.send(`Technician with the id ${req.query.id} was successfully removed.`);
        res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error removed technician with id ${req.query.id}`,
        });
      });
    } else {
      res.status(403).send({
        message: `Cannot delete technician with an appointment scheduled.`
    });
    } 
  });
}

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

  Technicians.findOneAndUpdate({ _id: req.query.id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update technician with id ${req.query.id}. Verify that it exists`,
        });
      } else {
        res.send({ message: "Technician was successfully updated" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating technician with id ${req.query.id}`,
      });
    });
};
