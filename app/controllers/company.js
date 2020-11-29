const db = require("../models");
const Company = db.company;

//get and show all companies
exports.findAll = (req, res) => {
    Company.find({})
        .then( data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error white trying to retrive companies"
            });
        });
};

//get one company (by id) and show it
exports.findOne = (req, res) => {
    Company.findOne({id: req.params.id})
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

//create a new company and show the new list
exports.create = (req, res) => {
    //make sure the request is valid ???

    //create the company as a new object
    const company = new Company ({
        id: req.body.id,
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

//Get one of the companies by its id, updated it and save it on the DB.
exports.update = (req, res) => {
    Company.update({id: req.params.id})
        .then(data => {           
            
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while trying to update this company"                
            });
        });
};
