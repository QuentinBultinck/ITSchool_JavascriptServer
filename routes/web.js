const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('pages/index');
}).get('/population', function (req, res, next) {
    res.render('pages/population');
});

module.exports = router;
