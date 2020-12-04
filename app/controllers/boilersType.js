const db = require('../models');
const boilersType = db.boilersType;

// Create a new type of boiler
exports.create = (req, res) => {
    //Validation - Malfunction
    if(!req.body.description || !req.body.type || !req.body.maxCapacity ||
        !req.body.temperatureRange || !req.body.weight){
            console.log(req.body.description);
            console.log(req.body.type);
            console.log(req.body.maxCapacity);
            console.log(req.body.temperatureRange);
            console.log(req.body.weight);
            res.status(400).send({ message: 'Content can not be empty'});
            return;
    }
    // Create a new type
    const newType = new boilersType({
        description: req.body.description,
        type: req.body.type,
        maxCapacity: req.body.maxCapacity,
        temperatureRange: req.body.temperatureRange,
        weight: req.body.weight,
    });
    //Save new type
    newType
    .save(newType)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the new type'
        });
    });
};

// Get all types
exports.findAll = (req, res, next) => {
    if(Object.keys(req.query).length === 0) {
        boilersType.find({})
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving types.',
                });
            });
    } else {
        next();
    }
};

// Get type by id
exports.findOne = (req, res, next) => {
    if(Object.keys(req.query).includes('_id')){
        boilersType.findOne(req.query)
        .then((data) => {
            if(!data){
                return res.status(404).send({
                    message: `Boiler type with the id ${req.query} was not found.`
                })
            }
            res.send(data)
        })
        .catch((err) => {
            res.status(404).send({
                message: err.message || 'Some error occured while retrieving types.'
            });
        });
    } else {
        next();
    }
};

// Get type by attribute
exports.filter = (req, res) => {
    const atr = req.query.attribute;
    const value = req.query.value;
    boilersType.find({[atr]:value})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                msg: `Boilers types with ${value} as ${atr} was not found.`
            })
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            msg: 'Some error occured while retrieving types.'
        });
    });
};

// Update a type
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send ({
            message: 'Data to update can not be empty!'
        });
    }
    // Validation
    if(!req.body.description || !req.body.type || !req.body.maxCapacity ||
        !req.body.temperatureRange || !req.body.weight) {
            res.status(400).send({ message: 'Content can not be empty'});
            return;
        }
    const id = req.query._id;
    boilersType.findOneAndUpdate({_id: id}, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Cannot update boiler type with id-${id}. Maybe boiler type was not found.`
            });
        } else res.send({message: 'Boiler type was update successfully'});
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error updating boiler type with id = ' + id
        });
    });
};

// Delete a type
exports.delete = (req, res) => {
    const id = req.query.id;
    boilersType.findOneAndRemove({_id: id}, { useFindAndModify: false })
        .then(data =>
            res.send({ message: 'boiler type was removed successfully.'})
        )
        .catch(err => {
            res.status(500).send({
                message: 'Error removing boiler type with id = ' + id
            });
        });
};