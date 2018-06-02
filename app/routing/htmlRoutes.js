"use strict";

var path = require("path");

module.exports = (function() {

    var htmlRoutes = require('express').Router();

    // __dirname provides the absolute path to the directory that contains this file (htmlRoutes.js)
    // so we need to go up one level in order to navigate to our HTML files
    htmlRoutes.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    htmlRoutes.get('/images/:image', function (req, res) {
        var chosen = req.params.image;
        res.sendFile(path.join(__dirname, `../public/images/${chosen}`));
    });
    
    htmlRoutes.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    return htmlRoutes;
})();