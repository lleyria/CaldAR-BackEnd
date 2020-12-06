const db = require("../models");
const buildings = db.buildings;
const Appointments = db.appointments;
const Companies = db.companies;

//Get all buildings
exports.findAll = (req, res) => {
  if (Object.keys(req.query).length === 0) {
    buildings
      .find({})
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(500).send({
          msg: "Internal server error",
        });
      });
  }
};

//Find Building by Id
exports.findOne = (req, res) => {
  if (Object.keys(req.query).includes("id") && req.query.id.length === 24) {
    buildings
      .findOne({ _id: req.query.id })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            msg: `Building with id ${req.query.id} was not found.`,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          msg: "Internal server error",
        });
      });
  } else {
    res.status(403).send({
      msg: "Forbidden: argument passed in must be a string of 24 hex characters.",
    });
  }
};

//Create a new building
exports.create = (req, res) => {
  if (
    !req.body.buildingName ||
    !Object.keys(req.body).includes("companyBuilding") ||
    !req.body.address ||
    !req.body.managerName ||
    !req.body.phone||
    !req.body.boilersId ||
    !req.body.boilerTypes ||
    !req.body.boilerAmount
  ) {
    return res.status(400).send({ message: "Content can not be empty." });
  }

  const build = new buildings({
    buildingName: req.body.buildingName,
    companyBuilding: req.body.companyBuilding,
    companyName: req.body.companyName,
    address: req.body.address,
    managerName: req.body.managerName,
    boilersId: req.body.boilersId,
    phone: req.body.phone,
    boilerTypes: req.body.boilerTypes,
    boilerAmount: req.body.boilerAmount,
  });
  build
    .save(build)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        msg: "Internal server error",
      });
    });
};

//Update by Id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      msg: "Data to update can not be empty.",
    });
  }

  const id = req.query.id;

  buildings
    .findOneAndUpdate({ _id: id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          msg: `Cannot update building with id=${id}.`,
        });
      } else {
        res.send({ msg: "Building was updated successfully." });
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Internal Server Error",
      });
    });
};

//Delete By Id
exports.delete = (req, res) => {
  if (
    Object.keys(req.query).includes("id") &&
    Appointments.findOne({ building: req.query.id }).then((data) => data) === null &&
    Companies.findOne({ buildings: req.query.id }).then((data) => data) === null
  ) {
    const id = req.query.id;
    buildings
      .findOneAndRemove({ _id: id }, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            msg: `Building with ${id} was not found.`,
          });
        }
        res.send({ msg: "Building was removed successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Internal Server Error",
        });
      });
  } else {
    res.status(403).send({
      msg: `Forbidden: it is not possible to remove building with id ${req.query.id}`,
    });
  }
};

//Get Buildings by Attribute
exports.filter = (req, res) => {
  if (Object.keys(req.query).includes("attr") && Object.keys(req.query).includes("value")) {
    const attr = req.query.attr;
    const value = req.query.value;
    buildings
      .find({ [attr]: value })
      .then((data) => {
        if (!data || data.length === 0) {
          return res.status(404).send({
            msg: `Building with ${req.query.attr} as ${req.query.value} was not found.`,
          });
        }
        res.send(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(500).send({
          msg: "Internal server error",
        });
      });
  } else {
    res.status(403).send({
      msg: "Forbidden: It should be pass an argument called attr and another argument called value.",
    });
  }
};
