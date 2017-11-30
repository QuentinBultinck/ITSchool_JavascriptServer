const express = require('express');
const axios = require("axios");
const router = express.Router();

router
    .get('/', function (req, res, next) {
        res.render('pages/index');
    })
    .get("/nomad/:firstName", function (req, res, next) {
        axios.get("http://cunning-convoys.azurewebsites.net/api/Convoys").then(response => {
            for(let convoyIndex = 0; convoyIndex < response.data.length; convoyIndex++){
                for(let vehicleIndex = 0; vehicleIndex < response.data[convoyIndex].vehicles.length; vehicleIndex++){
                    for(let nomadIndex = 0; nomadIndex < response.data[convoyIndex].vehicles[vehicleIndex].nomads.length; nomadIndex++){
                        if(response.data[convoyIndex].vehicles[vehicleIndex].nomads[nomadIndex].firstName === req.params.firstName){
                            nomadToFind = response.data[convoyIndex].vehicles[vehicleIndex].nomads[nomadIndex];
                            break;
                        }
                    }
                }
            }
            res.render("pages/nomad", {nomad: nomadToFind});
        });
    })
    .get("/convoys", function (req, res, next) {
        axios.get("http://cunning-convoys.azurewebsites.net/api/Convoys").then(response => {
            res.render("pages/convoys", {convoys: response.data});
        })
    })
    .get("/owner/:licenseplate", function (req, res, next) {
        axios.get("http://cunning-convoys.azurewebsites.net/api/Dmv").then(response => {
            let data = response.data.find(dmv => {
                return dmv.licensePlate === req.params.licenseplate;
            });
            res.render("pages/owner", {licensePlate: data.licensePlate, owner: data.owner});
        })
    });

module.exports = router;
