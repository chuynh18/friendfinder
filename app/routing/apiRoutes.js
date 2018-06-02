"use strict";

var path = require("path");

// since the business logic for the API calls has to live inside apiRoutes,
// apiRoutes has to import friends.js
var friends = require("../data/friends");

module.exports = (function() {

    var apiRoutes = require('express').Router();

    apiRoutes.get("/friends", (req, res) => {
        console.log(friends);
        res.send(friends);
    })

    return apiRoutes;
})();