const express = require('express');
const axios = require("axios");
const router = express.Router();

router
    .get('/', function (req, res, next) {
        res.render('pages/index');
    })
    .get('/population', function (req, res, next) {
        res.render('pages/population');
    })
    .get("/convoy/:id", function (req, res, next) {
        axios.get("http://cunning-convoys.azurewebsites.net/api/Convoys").then(response => {
            let searchedConvoy = response.data.find(convoy => {
                return convoy.id === req.params.id;
            });
            res.render("pages/convoy", {convoy: searchedConvoy});
        })
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
