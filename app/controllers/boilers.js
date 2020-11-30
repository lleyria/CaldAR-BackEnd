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
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send ({
            message: 'Data to update can not be empty!'
        });
    }
    // Validation
    if(!req.body.lot || !req.body.boilersTypeId || !req.body.fabricationDate || !req.body.expirationDate){
        res.status(400).send({ message: 'Content can not be empty'});
        return;
    }
    const id = req.params.id;
    boilers.findOneAndUpdate({id}, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Cannot update boiler with id-${id}. Maybe boiler was not found.`
            });
        } else res.send({message: 'Boiler was update successfully'});
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error updating boiler with id = ' + id
        });
    });
};

// Delete a boiler
exports.delete = (req, res) => {
    const id = req.params.id;
    boilers.findOneAndRemove({id}, { useFindAndModify: false })
    .then(data => {
        console.log(data)
        res.send({ message: 'boilers was removed successfully.'})
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error removing boiler with id = ' + id
        });
    });
};