const { restart } = require("nodemon");
const db = require("../models");
const company = require("../models/companies");
const Company = db.company;

//get and show all companies
exports.findAll = (req, res) => {
    Company.find({})
        .then(data => {             
             res.send(data);            
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "error white trying to retrive companies",
            });
        });
};

//get one company (by id) and show it
exports.findOne = (req, res) => {
    Company.findOne({_id: req.params.id})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `The company with the id of ${req.params.id} does not exist`
                    
                })               
            }
            res.send(data)            
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while trying to retrive this company"                
            });
        });
};

// //create a new company and show the new list
exports.create = (req, res) => {
    //make sure the request is valid
    if (
        !req.body._id || 
        !req.body.name ||
        !req.body.email ||
        !req.body.contact ||
        !req.body.buildings ||
        !req.body.boilers ||
        !req.body.maintenanceHours
      ) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
      }

    //create the company as a new object
    const company = new Company ({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        buildings: req.body.buildings,
        boilers: req.body.boilers,
        maintenanceHours: req.body.maintenanceHours,
    });

    //save the object "company" in the DB
    company
        .save(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "error while trying to create the company" 
            });
        });
};
//get one of the companies by its ID then delete it.
exports.deleteOne = (req,res) => {    
    Company.deleteOne({_id: req.params.id}, { useFindAndModify: false })
        .then( data =>
            res.send({ message: "The company selected was deleted" })
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while trying to delete the company" 
            });
        });
};
 //Get one of the companies by its id, updated it and save it on the DB.
exports.update = (req, res) => {
    //validates that you did not send an emtpy json
    if(!req.body) {
        return res.status(400).send({
            message: "the document for the update can not be empty"
        });
    }

    //validate request
    if (
        !req.body._id || 
        !req.body.name ||
        !req.body.email ||
        !req.body.contact ||
        !req.body.buildings ||
        !req.body.boilers ||
        !req.body.maintenanceHours
    ) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    //after both filters we do the update itself
    Company.update({_id: req.params.id}, req.body)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update the company with the id of ${req.params.id}`
                });
            } else {
                res.send({ message: "Company udated!"});
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while trying to update this company"                
            });
        });
};


//get any company by a specific attribute.
exports.getByAttribute = (req,res) => {
    // const attribute = req.query.attribute;
    // const value = req.query.value;
    Company.find({[req.query.attribute]:req.query.value})
        .then(data => {
            if(!data) {
                return res.status(404).send ({
                    message: `Could not find the ${req.query.attribute} with the value
                    of ${req.query.value}`
                    
                })
            } else {
                res.send(data);
            }    
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Could not match the ${req.query.attribute} with the value
                    of ${req.query.value}`             
            });
        });    
};
