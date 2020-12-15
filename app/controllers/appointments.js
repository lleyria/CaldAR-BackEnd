const db = require("../models");
const Appointments = db.appointments;
const date = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
const hour =  /^\d{1,2}:\d{2}([ap]m)?$/;
const cantDays = [31,28,31,30,31,30,31,31,30,31,30,31]

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

  //Validate content
  const building = req.body.building;
  if(building.indexOf(' ') != -1){
    res.status(400).send({ message: "idBuilding cannot content spaces" });
    return;
  }
  const boiler = req.body.boiler;
  if(boiler.indexOf(' ') != -1){
    res.status(400).send({ message: "idBoiler cannot content spaces" });
    return;
  }
  const tech = req.body.technician;
  if(tech.indexOf(' ') != -1){
    res.status(400).send({ message: "idTechnician cannot content spaces" });
    return;
  }
  const mHours = req.body.monthlyHours;
  if(mHours < 0 || mHours > 160){
    res.status(400).send ({ message: "The minimum number of hours is 0, and the maximum 160" });
    return;
  }
  const start = req.body.startTimeStamp;
  const spaceStart = start.indexOf(' ');
  const onlyDateStart = start.substring(0, spaceStart);
  if(!date.test(onlyDateStart)){
    res.status(400).send({ message: "Bad date format, it is recommended MM/DD/YYYY"});
  }
  const onlyTimeStart = start.substring(spaceStart + 1);
  if(!hour.test(onlyTimeStart)){
    res.status(400).send({ message: "Bad time format, it is recommended HH:MM"});
  }
  const end = req.body.endTimeStamp;
  const spaceEnd = end.indexOf(' ');
  const onlyDateEnd = end.substring(0, spaceEnd);
  if(!date.test(onlyDateEnd)){
    res.status(400).send({ message: "Bad date format, it is recommended MM/DD/YYYY"});
  }
  const onlyTimeEnd = end.substring(spaceEnd + 1);
  if(!hour.test(onlyTimeEnd)){
    res.status(400).send({ message: "Bad time format, it is recommended HH:MM"});
  }
  // endDate greater than startDate
  if(onlyDateEnd < onlyDateStart){
    res.status(400).send({ message: "The end date cannot be earlier than the start date"});
  }
  if(onlyDateEnd === onlyDateStart){
    if(onlyTimeEnd <= onlyTimeStart){
      res.status(400).send({ message: "The end time cannot be earlier than the start time"});
    }
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

  const building = req.body.building;
  if(building.indexOf(' ') != -1){
    res.status(400).send({ message: "idBuilding cannot content spaces" });
    return;
  }
  const boiler = req.body.boiler;
  if(boiler.indexOf(' ') != -1){
    res.status(400).send({ message: "idBoiler cannot content spaces" });
    return;
  }
  const tech = req.body.technician;
  if(tech.indexOf(' ') != -1){
    res.status(400).send({ message: "idTechnician cannot content spaces" });
    return;
  }
  const mHours = req.body.monthlyHours;
  if(mHours < 0 || mHours > 160){
    res.status(400).send ({ message: "The minimum number of hours is 0, and the maximum 160" });
    return;
  }
  const start = req.body.startTimeStamp;
  const spaceStart = start.indexOf(' ');
  const onlyDateStart = start.substring(0, spaceStart);
  if(!date.test(onlyDateStart)){
    res.status(400).send({ message: "Bad date format, it is recommended MM/DD/YYYY"});
  }
  const onlyTimeStart = start.substring(spaceStart + 1);
  if(!hour.test(onlyTimeStart)){
    res.status(400).send({ message: "Bad time format, it is recommended HH:MM"});
  }
  const end = req.body.endTimeStamp;
  const spaceEnd = end.indexOf(' ');
  const onlyDateEnd = end.substring(0, spaceEnd);
  if(!date.test(onlyDateEnd)){
    res.status(400).send({ message: "Bad date format, it is recommended MM/DD/YYYY"});
  }
  const onlyTimeEnd = end.substring(spaceEnd + 1);
  if(!hour.test(onlyTimeEnd)){
    res.status(400).send({ message: "Bad time format, it is recommended HH:MM"});
  }
  // endDate greater than startDate
  if(onlyDateEnd < onlyDateStart){
    res.status(400).send({ message: "The end date cannot be earlier than the start date"});
  }
  if(onlyDateEnd === onlyDateStart){
    if(onlyTimeEnd <= onlyTimeStart){
      res.status(400).send({ message: "The end time cannot be earlier than the start time"});
    }
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
