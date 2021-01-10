const db = require('../models');
const boilers = db.boilers;
//to check the companies  boilers types DB for the delete validation
const Companies = db.companies;
const boilersType = db.boilersType;



// Create a new boiler
exports.create = (req, res) => {
    // Validation, already checks for null of the required values on the Schema
    // validation for the correct date format
    const re = /^\d{4}\-\d{2}\-\d{2}$/;
    if (!req.body.installationDate) {
        if(
            !req.body.lot || !req.body.companyName || !req.body.boilersTypeId || !req.body.fabricationDate || 
            !req.body.expirationDate || !re.test(req.body.fabricationDate) || !re.test(req.body.expirationDate)
        ) {
            res.status(400).send({ message: 'Content can not be empty and dates must have the correct format'});
            return;
        }
    } else {
        if(!req.body.lot || !req.body.boilersTypeId || !req.body.fabricationDate || !req.body.expirationDate || 
            !req.body.companyName || !re.test(req.body.fabricationDate) || !re.test(req.body.installationDate) ||
            !re.test(req.body.expirationDate)
        ) {
            res.status(400).send({ message: 'Content can not be empty and dates must have the correct format'});
            return;
        }
    }
    // Create a boiler
    const boiler = new boilers({
        //added id to test delete
        // _id:req.body._id,
        lot: req.body.lot,
        companyId: req.body.companyId,
        companyName: req.body.companyName,
        boilersTypeId: req.body.boilersTypeId,
        installationDate: req.body.installationDate,
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
            //validates it doesn't send an empty request, already placed.
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
    // Validation no empty field in the required params and correct date format.
    const re = /^\d{4}\-\d{2}\-\d{2}$/;
    if (!req.body.installationDate) {
        if(
            !req.body.lot || !req.body.boilersTypeId || !req.body.fabricationDate || !req.body.expirationDate ||
            !re.test(req.body.fabricationDate) || !re.test(req.body.expirationDate)
        ) {
            res.status(400).send({ message: 'Data to update can not be empty!'});
            return;
        }
    } else  {
        if(!req.body.lot || !req.body.boilersTypeId || !req.body.fabricationDate || !req.body.expirationDate ||
       !re.test(req.body.fabricationDate) || !re.test(req.body.installationDate) ||!re.test(req.body.expirationDate)
        ) {
            res.status(400).send({ message: 'Content can not be empty and dates must have the correct format'});
            return;
        }
    }
    const id = req.query.id; //En la request solo existe id no _id
    //validates we are updating an existing boiler in the db, already done.
    boilers.findOneAndUpdate({_id: id}, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Cannot update boiler with id-${id}. Maybe boiler was not found.`
            });
        } else res.send({message: 'Boiler was updated successfully'});
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error updating boiler with id = ' + id
        });
    });
};
// Delete a boiler
exports.delete = (req, res) => {
    if(Object.keys(req.query).includes("id")) {
        boilersType.findOne({ _id: req.query.id }).then((data) => {
            if(data=== null) {
                Companies.findOne({ boilers: req.query.id }).then((data) => {
                    if (data === null) {
                        boilers.findOneAndRemove({ _id: req.query.id}, { useFindAndModify: false })
                .then((data) => {
                    if(!data) {
                        return res.status(404).send({
                            message: "boiler was not found",
                        });
                    }
                    res.send({ message: 'boiler was removed successfully.'});
                    // res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message: "internal error",
                    });
                });

                } else {
                    res.status(403).send({
                        message: "Cannot delete a boiler assigned to a company",
                    });

                }
            });
            } else {
                res.status(403).send({
                    message: "Cannot delete a boiler  also assigned to the types collection",
                });

            }
        });

    } else {
        res.status(404).send({
            message: "make sure you use a valid id",
        });
    }
};
