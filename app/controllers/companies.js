const { restart } = require("nodemon");
const db = require("../models");
const companies = require("../models/companies");
const Companies = db.companies;

//get and show all companies (to show them all the query will be empty)

exports.findAll = (req, res, next) => {
    if(Object.keys(req.query).length === 0) {
        Companies.find({})
        .then(data => {             
             res.send(data);            
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "error white trying to retrive companies",
            });
        });

    }else {
        // to avoid conflict with the other controllers
        next();
    } 
};


//get one company (by id) and show it
exports.findOne = (req, res, next) => {    
    if (Object.keys(req.query).includes("_id")) {
      Companies.findOne(req.query.id)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:  `The company with the id of ${req.query.id} does not exist`,
          });
        });
    } else {
      next();
    }
  };



// exports.findOne = (req, res) => {
//     Companies.findOne({_id: req.params.id})
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     message: `The company with the id of ${req.params.id} does not exist`
                    
//                 })               
//             }
//             res.send(data)            
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "error while trying to retrive this company"                
//             });
//         });
// };

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
    const companies = new Companies ({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        buildings: req.body.buildings,
        boilers: req.body.boilers,
        maintenanceHours: req.body.maintenanceHours,
    });

    //save the object "company" in the DB
    companies
        .save(companies)
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
    Companies.deleteOne({_id: req.params.id}, { useFindAndModify: false })
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
    Companies.update({_id: req.params.id}, req.body)
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
    Companies.find({[req.query.attribute]:req.query.value})
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
