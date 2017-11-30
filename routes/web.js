const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/', function (req, res, next) {
    axios.get("").then(response => {

    }).catch(err => {
        console.error(err);
    });
    res.render('pages/index');
});

module.exports = router;
