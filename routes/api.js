const express = require('express');
const router = express.Router();
const axios = require("axios");

router.get('/users', function (req, res, next) {
    axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
        res.json(response.data);
    }).catch(err => {
        console.error(err);
    });
});

module.exports = router;