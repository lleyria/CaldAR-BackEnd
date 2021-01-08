const db = require("../models");
const Companies = db.companies;
const buildings = db.buildings;
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
            if (!data) {
                return res.status(404).send({
                    message: `Company with id ${req.query.id} was not found.`
                })
            }
            res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:  `Some error occurred while retrieving technician with id ${req.query.id}`,
          });
        });
    } else {
      next();
    }
  };

//create a new company and show the new list
exports.create = (req, res) => {
    //make sure the request is valid
    if ( 
        !req.body.name ||
        !req.body.companyName ||
        !req.body.address ||
        !req.body.managerName ||
        !req.body.phone ||
        !req.body.boilerType  
      ) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
      }

    //create the company as a new object
    const companies = new Companies ({
        name: req.body.name,
        companyName: req.body.companyName,
        address: req.body.address,
        managerName: req.body.managerName,
        phone: req.body.phone,
        boilerType: req.body.boilerType
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
    buildings.findOne({companyName:req.query.companyName})
    .then(data =>{
        if(!data){
            Companies.findOneAndRemove({_id: req.query._id}, { useFindAndModify: false })
            .then( data =>{
            if (!data) {
                res.status(404).send({
                  message: `Cannot delete company with id=${id}.`
                });
            } else {
              res.status(200).send({
                message: `The company selected was deleted`   
            });
            res.send(data); 
            }    
        })     
        } else {
            res.status(403).send({
                message: 'Cannot delete a company with buildings attached to it.'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "error while trying to delete the company" 
        });
    });
};
 //Get one of the companies by its id, updated it and save it on the DB. No need for next()
 // because there is only one POST metod
exports.update = (req, res) => {
    //validates that you did not send an emtpy json
    if(!req.body) {
        return res.status(400).send({
            message: "the document for the update can not be empty"
        });
    }

    //validate request
    if ( 
        !req.body.name ||
        !req.body.companyName ||
        !req.body.address ||
        !req.body.managerName ||
        !req.body.phone ||
        !req.body.boilerType 
    ) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    //after both filters we do the update itself, create and save the new company
    Companies.findOneAndUpdate({_id: req.query._id}, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update the company with the id of ${req.params.id}`
                });
            } else {
                res.send({ message: "Company updated!"});
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
