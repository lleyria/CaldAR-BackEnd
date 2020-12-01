const db = require('../models')
const Building = db.building;

//Get all buildings
exports.findAll = (req, res) =>{
    Building.find({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            msg: "Internal server error"
        })
    })
}

//Find Building by Id
exports.findOne = (req, res) => {
    Building.findOne({id:req.query.id})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Building with id ${req.query.id} was not found.`
                })
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: "Internal server error"
            });
        });
};

//Create a new building
exports.create = (req, res) => {
    if (!req.body.buildingName || !req.body.companyBuilding || !req.body.address || !req.body.managerName || !req.body.phone || !req.body.boilersId || !req.body.boilerTypes || !req.body.boilerAmount) {
        res.status(400).send({ message: "Content can not be empty." });
         return;
     }

    const build = new Building({
        id: req.body.id,
        buildingName: req.body.buildingName,
        companyBuilding: req.body.companyBuilding,
        companyName: req.body.companyName,
        address: req.body.address,
        managerName: req.body.managerName,
        boilersId: req.body.boilersId,
        phone: req.body.phone,
        boilerTypes: req.body.boilerTypes,
        boilerAmount: req.body.boilerAmount
    });
    build
        .save(build)
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                msg: "Internal server error"
            });
        });
};

//Update by Id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            msg: "Data to update can not be empty."
        });
    }

    const id = req.query.id;

    Building.findOneAndUpdate({id}, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: `Cannot update building with id=${id}.`
                });
            } else res.send({ msg: "Building was updated successfully." });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: "Internal Server Error"
            });
        });
};

//Delete By Id
exports.delete = (req, res) => {
    const id = req.query.id;
    Building.findOneAndRemove({id}, { useFindAndModify: false })
        .then(data =>
            res.send({ msg: "Building was removed successfully."})
        )
        .catch(err => {
            res.status(500).send({
                msg: 'Internal Server Error'
            });
        });
};

//Get Buildings by Attribute
exports.filter = (req, res) => {
    const attr = req.query.attr;
    const value = req.query.value;
    Building.find({[attr]:value})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    msg: `Building with ${req.query.value} as ${req.query.attr} was not found.`
                })
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: "Internal server error"
            });
        });
};




