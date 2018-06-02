"use strict";

var path = require("path");

// since the business logic for the API calls has to live inside apiRoutes,
// apiRoutes has to import friends.js so it has the data it needs to work with.
var friends = require("../data/friends");

module.exports = (function() {

    var apiRoutes = require('express').Router();

    // sending a GET request to /api/friends will cause the server to send friends as a JSON
    apiRoutes.get("/friends", (req, res) => {
        res.send(friends);
    })

    // sending a POST request containing the survey results to /api/friends
    // will cause the server to receive and process the survey results, then respond
    // with the "most compatible" friend
    apiRoutes.post("/friends", (req, res) => {
        // logic to receive and parse request from client

        // logic to process request and find closest match

        // logic to send response back to client regarding closest match
    })

    return apiRoutes;
})();