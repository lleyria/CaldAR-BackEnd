const db = require('../models');
const boilers = db.boilers;

// Create a new boiler
// Get all boilers
exports.findAll = (req, res) => {
    boilers.find({})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving boilers.",
        });
    });
};
// Get boiler by id
exports.findId = (req, res) => {
    boilers.findOne({id: req.query})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message || `Boiler with the id ${req.query} not found`
        });
    });
};
// Get boiler by attribute
// Update a boiler
// Delete a boiler