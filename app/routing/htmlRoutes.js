"use strict";

var path = require("path");

var htmlRoutes = require('express').Router();

// __dirname provides the absolute path to the directory that contains this file (htmlRoutes.js)
// so we need to go up one level in order to navigate to our HTML files
htmlRoutes.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

htmlRoutes.get('/images/:image', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/images/${req.params.image}`));
});

htmlRoutes.get('/css/:css', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/css/${req.params.css}`));
});

htmlRoutes.get('/js/:js', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/js/${req.params.js}`));
});

htmlRoutes.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = htmlRoutes;