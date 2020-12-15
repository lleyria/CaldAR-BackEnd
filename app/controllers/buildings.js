const db = require("../models");

const buildings = db.buildings;
const Appointments = db.appointments;
const Companies = db.companies;

const regexObjectId = /^[a-f\d]{24}$/;
const regexName = /^[a-zA-Z' ]+$/;
const regexBoolean = /(true|false)$/;
const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
const regexPhoneNumber = /^[0-9]{7,}$/;
const regexBoilerTypes = /([A-D '-]){1,8}$/;
const regexOnlyNumber = /^[0-9]*$/;

// Get all buildings
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

// Find Building by Id
exports.findOne = (req, res) => {
  if (Object.keys(req.query).includes("id") && regexObjectId.test(req.query.id)) {
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
      msg: "Forbidden: argument passed in cannot be empty and it must be a string of 24 hex characters.",
    });
  }
};

// Create a new building
exports.create = (req, res) => {
  if (
    !req.body.buildingName ||
    !req.body.companyBuilding ||
    !req.body.address ||
    !req.body.managerName ||
    !req.body.phone ||
    !req.body.boilersId ||
    !req.body.boilerTypes ||
    !req.body.boilerAmount
  ) {
    return res.status(400).send({ message: "Content can not be empty." });
  }

  // Format validation.
  if (!regexName.test(req.body.buildingName)) {
    return res.status(400).send({
      message: "Invalid buildingName.",
    });
  }

  if (!regexBoolean.test(req.body.companyBuilding)) {
    return res.status(400).send({
      message: "companyBuilding can only contain true or false values.",
    });
  }

  if (!regexAddress.test(req.body.address) || regexOnlyNumber.test(req.body.address)) {
    return res.status(400).send({
      message: "Invalid address. An address cannot contain only numbers.",
    });
  }

  if (!regexName.test(req.body.managerName) || req.body.managerName.length < 5) {
    return res.status(400).send({
      message: "Invalid managerName. It must has a minimun length of 5.",
    });
  }

  if (!regexPhoneNumber.test(req.body.phone)) {
    return res.status(400).send({
      message: "Invalid phone. It must has a minimun length of 7 digits.",
    });
  }

  if (Array.isArray(req.body.boilersId)) {
    const boilersId = req.body.boilersId;
    for (let i = 0; i < boilersId.length; i++) {
      if (!regexObjectId.test(boilersId[i])) {
        return res.status(400).send({
          message: "Every boilersId must be a string of 24 hex characters.",
        });
      }
    }
  } else {
    return res.status(400).send({
      message: "Invalid input. boilersId must be an Array.",
    });
  }

  if (!regexBoilerTypes.test(req.body.boilerTypes)) {
    return res.status(400).send({
      message: "A boiler type included is not available. Currently boilers types available are: A, B, C and D.",
    });
  }

  if (!regexOnlyNumber.test(req.body.boilerAmount)) {
    return res.status(400).send({
      message: "Invalid input. boilerAmount must be an int number.",
    });
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
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Internal server error",
      });
    });
};

// Update by Id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      msg: "Data to update can not be empty.",
    });
  }
  // Format validation
  if (!regexName.test(req.body.buildingName)) {
    return res.status(400).send({
      message: "Invalid buildingName.",
    });
  }

  if (!regexBoolean.test(req.body.companyBuilding)) {
    return res.status(400).send({
      message: "companyBuilding can only contain true or false values.",
    });
  }

  if (!regexAddress.test(req.body.address) || regexOnlyNumber.test(req.body.address)) {
    return res.status(400).send({
      message: "Invalid address. An address cannot contain only numbers.",
    });
  }

  if (!regexName.test(req.body.managerName) || req.body.managerName.length < 5) {
    return res.status(400).send({
      message: "Invalid managerName. It must has a minimun length of 5.",
    });
  }

  if (!regexPhoneNumber.test(req.body.phone)) {
    return res.status(400).send({
      message: "Invalid phone. It must has a minimun length of 7 digits.",
    });
  }

  if (Array.isArray(req.body.boilersId)) {
    const boilersId = req.body.boilersId;
    for (let i = 0; i < boilersId.length; i++) {
      if (!regexObjectId.test(boilersId[i])) {
        return res.status(400).send({
          message: "Every boilersId must be a string of 24 hex characters.",
        });
      }
    }
  } else {
    return res.status(400).send({
      message: "Invalid input. boilersId must be an Array.",
    });
  }

  if (!regexBoilerTypes.test(req.body.boilerTypes)) {
    return res.status(400).send({
      message: "A boiler type included is not available. Currently boilers types available are: A, B, C and D.",
    });
  }

  if (!regexOnlyNumber.test(req.body.boilerAmount)) {
    return res.status(400).send({
      message: "Invalid input. boilerAmount must be an int number.",
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

// Delete By Id
exports.delete = (req, res) => {
  if (Object.keys(req.query).includes("id") && regexObjectId.test(req.query.id)) {
    Appointments.findOne({ building: req.query.id }).then((data) => {
      if (data === null) {
        Companies.findOne({ buildings: req.query.id }).then((data) => {
          if (data === null) {
            buildings
              .findOneAndRemove({ _id: req.query.id }, { useFindAndModify: false })
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
              msg: "Forbidden: Cannot delete a building associated with a specified company.",
            });
          }
        });
      } else {
        return res.status(403).send({
          msg: "Forbidden: Cannot delete a building associated with a specified appointment.",
        });
      }
    });
  } else {
    res.send({ msg: "Argument passed in cannot be empty and it must be a string of 24 hex characters." });
  }
};

// Get Buildings by Attribute
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
