const db = require('../models');
const boilers = db.boilers;

// Create a new boiler
exports.create = (req, res) => {
    // Validation
    if(!req.body.lot || !req.body.boilersTypeId || !req.body.fabricationDate || !req.body.expirationDate){
        res.status(400).send({ message: 'Content can not be empty'});
        return;
    }

    // Create a boiler
    const boiler = new boilers({
        lot: req.body.lot,
        companyId: req.body.companyId,
        boilersTypeId: req.body.boilersTypeId,
        instalationDate: req.body.instalationDate,
        fabricationDate: req.body.fabricationDate,
        expirationDate: req.body.expirationDate,
    });

    // Save new boiler
    boiler
        .save(boiler)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while creating the boiler.'
            });
        });
};

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
exports.findOne = (req, res) => {
    boilers.findOne({_id: req.params._id})
    .then((data) => {
        if(!data){
            return res.status(404).send({
                message: `Boiler with the id ${req.params._id} was not found`
            })
        }
        res.send(data)
    })
    .catch((err) => {
        res.status(404).send({
            message: err.message || 'Some error occured while retrieving boilers.'
        });
    });
};

// Get boiler by attribute
// Update a boiler
// Delete a boiler