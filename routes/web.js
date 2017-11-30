const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('pages/index');
}).get('/population', function (req, res, next) {
    res.render('pages/population');
});
//     .get("/nomad/:firstname", function (req, res, next) {
//     axios.get("http://cunning-convoys.azurewebsites.net/api/Convoys").then(response => {
//         response.data
//     })
// });

module.exports = router;
