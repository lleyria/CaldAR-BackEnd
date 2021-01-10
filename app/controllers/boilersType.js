const db = require('../models');
const boilersType = db.boilersType;
// add boilers and technitians
const Technicians = db.technicians;
const boilers = db.boilers;

// Create a new type of boiler
exports.create = (req, res) => {
    //Validation - Malfunction
    const re = /^\d{1,2}\/\d{2,3}$/;
    //validate first for empty values in the doc
    if(!req.body.description || !req.body.type || !req.body.maxCapacity ||
        !req.body.temperatureRange || !req.body.weight || !req.body.monthlyMaintenanceTime){            
            res.status(400).send({ message: 'Content can not be empty'});
            return;
    }
    //check for negative values
    if( req.body.weight <= 0 || req.body.maxCapacity <= 0) {
            
        res.status(400).send({ message: 'values must be real'});
        return;
    }
    //finally check for format
    if (!re.test(req.body.temperatureRange)) {               
        res.status(400).send({ message: 'format for temp range is not correct'});
        return;
    }           
    // Create a new type
    const newType = new boilersType({
        //added id to test delete
        // _id:req.body._id,
        description: req.body.description,
        type: req.body.type,
        maxCapacity: req.body.maxCapacity,
        temperatureRange: req.body.temperatureRange,
        weight: req.body.weight,
        monthlyMaintenanceTime: req.body.monthlyMaintenanceTime
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
    const re = /^\d{1,2}\/\d{2,3}$/;
    // Validation
    if(
        !req.body.description || !req.body.type || !req.body.maxCapacity ||
        !req.body.temperatureRange || !req.body.weight || !req.body.monthlyMaintenanceTime
        ) {
            res.status(400).send({ message: 'Content can not be empty'});
            return;
        }
    //check for negative values
    if( req.body.weight <= 0 || req.body.maxCapacity <= 0) {
            
        res.status(400).send({ message: 'values must be real'});
        return;
    }
    //finally check for format
    if (!re.test(req.body.temperatureRange)) {               
        res.status(400).send({ message: 'format for temp range is not correct'});
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
// delete checks for a match with both technicians and boilers collections
exports.delete = (req, res) => {
    const id = req.query.id;
    if(Object.keys(req.query).includes("id")) {
        boilers.findOne({ _id: req.query.id }).then((data) => {
            if(data=== null) {
                Technicians.findOne({ boilersTypeId: req.query.id }).then((data) => {
                    if (data === null) {
                        boilersType.findOneAndRemove({ _id: req.query.id}, { useFindAndModify: false })
                .then((data) => {
                    if(!data) {
                        return res.status(404).send({
                            message: "boilerType was not found",
                        });
                    }                              
                    res.send({ message: 'boilerType was removed successfully.'});
                    // res.send(data)                
                })
                .catch(err => {
                    res.status(500).send({
                        message: "internal error",
                    });
                });

                } else {
                    res.status(403).send({
                        message: "Cannot delete a boiler assigned to a technician",
                    });

                }
            });
            } else {
                res.status(403).send({
                    message: "Cannot delete a boilerType  also assigned to the boilers ",
                });

            }
        });
            
    } else {
        res.status(404).send({
            message: "make sure you use a valid id",
        });
    }
};
