const express = require('express');
const router = express.Router();
const buildings = require('../data/buildings_mock_data');

//Get Buildings by Address
router.get('/byaddress/:address', (req, res) => {
    
    const found = buildings.some(building => building.address === req.params.address);
    
    if(found){
        res.json(buildings.filter(building => building.address === req.params.address)); 
    } else {
        res.status(404).json({msg: `No building with ${req.params.id} as address`});
    }
});

//Get Buildings by Boiler ID
router.get('/byboilersid/:boilersId', (req, res) => {
    
    const found = buildings.some(building => building.boilersId === parseInt(req.params.boilersId));
    
    if(found){
        res.json(buildings.filter(building => building.id === parseInt(req.params.boilersId))); 
    } else {
        res.status(404).json({msg: `No building with ${req.params.boilersId} as boilers id`});
    }
});

//Get Buildings by Full Name
router.get('/byfullname/:fullName', (req, res) => {
    
    const found = buildings.some(building => building.fullName === req.params.fullName);
    
    if(found){
        res.json(buildings.filter(building => building.fullName === req.params.fullName)); 
    } else {
        res.status(404).json({msg: `No building with ${req.params.fullName} as full name`});
    }
});

//Get Buildings by Phone
router.get('/byphone/:phone', (req, res) => {
    
    const found = buildings.some(building => building.phone === req.params.phone);
    
    if(found){
        res.json(buildings.filter(building => building.phone === req.params.phone)); 
    } else {
        res.status(404).json({msg: `No building with ${req.params.phone} as phone number`});
    }
});


module.exports = router;