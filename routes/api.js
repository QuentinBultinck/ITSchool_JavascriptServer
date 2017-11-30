const express = require('express');
const router = express.Router();
const axios = require("axios");

router.get('/nomadNames', function (req, res, next) {
    axios.get("https://jsonplaceholder.typicode.com/Convoys").then(response => {
        let nomads = [];
        response.data.forEach(convoy => {
            convoy.vehicles.forEach(vehicle => {
                vehicle.nomads.forEach(nomad => {
                    nomads.push(nomad.firstName);
                })
            })
        });
        res.json(nomads);
    }).catch(err => {
        console.error(err);
    });
});

module.exports = router;