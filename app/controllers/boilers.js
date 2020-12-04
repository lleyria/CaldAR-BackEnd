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
exports.findAll = (req, res, next) => {
    if(Object.keys(req.query).length === 0){
        boilers.find({})
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving boilers."
                });
            });
    } else {
        next();
    }
};

// Get boiler by id
exports.findOne = (req, res, next) => {
    if(Object.keys(req.query).includes('_id')){
        console.log(req.query);
        boilers.findOne(req.query)
        .then((data) => {
            if(!data){
                return res.status(404).send({
                    message: `Boiler with the id ${req.query.id} was not found`
                })
            }
            res.send(data)
        })
        .catch((err) => {
            res.status(404).send({
                message: err.message || 'Some error occured while retrieving boilers.'
            });
        });
    } else {
        next();
    }
};

// Get boiler by attribute
exports.filter = (req, res) => {
    const atr = req.query.attribute;
    const value = req.query.value;
    boilers.find({[atr]:value})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                msg: `Boilers with ${value} as ${atr} was not found.`
            })
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            msg: 'Some error occured while retrieving boilers.'
        });
    });
};

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
    const id = req.query._id;
    boilers.findOneAndUpdate({_id: id}, req.body, { useFindAndModify: false })
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
    const id = req.query.id;
    console.log(id);
    boilers.findOneAndRemove({_id: id}, { useFindAndModify: false })
        .then(data =>
            res.send({ message: 'boilers was removed successfully.'})
        )
        .catch(err => {
            res.status(500).send({
                message: 'Error removing boiler with id = ' + id
            });
        });
};