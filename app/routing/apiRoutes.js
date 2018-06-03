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

        // ========= LOGIC TO RECEIVE/PARSE CLIENT REQUEST =========
        var surveyResult = [];
        var rejected = false;
        Object.keys(req.body).forEach(element => {
            var tempAnswer = parseInt(req.body[element]);
            if (tempAnswer < 1) { // reject numbers smaller than 1
                surveyResult.push(false);
                if (!rejected) {
                    rejected = true;
                }
            }
            else if (tempAnswer > 5) { // reject numbers larger than 5
                surveyResult.push(false);
                if (!rejected) {
                    rejected = true;
                }
            }
            else if (isNaN(tempAnswer)) { // reject non-numbers
                surveyResult.push(false);
                if (!rejected) {
                    rejected = true;
                }
            }
            else { // accept everything else (which should be integers 1 through 5 inclusive)
                surveyResult.push(tempAnswer);
            }
        });
        

        if (surveyResult.length > 10) { // reject requests with more than 10 keys
            res.send("Error:  request has too many keys.  Expected 10 keys.");
            if (!rejected) {
                rejected = true;
            }
        }
        else if (surveyResult.length < 10) { // reject requests with fewer than 10 keys
            res.send("Error:  request has too few keys.  Expected 10 keys.");
            if (!rejected) {
                rejected = true;
            }
        }
        else if (surveyResult.indexOf(false) > -1) { // reject requests that contain invalid values (examine the forEach loop above)
            res.send("Error:  request contains invalid value.");
        }
        // this block to be deleted after code below is complete
        else if (surveyResult.length === 10) { // accept valid requests
            res.send(surveyResult);
        }
        if (rejected) {
            console.log("\nInvalid request received.  Rejecting request...");
        }
        else {
            console.log("\nValid request received.")

            // ========= LOGIC TO PROCESS THE REQUEST AND FIND CLOSEST MATCH =========
            var friendsCopy = [...friends.friends];
            var currentMatch = {name: "this homework is DARTH TEDIOUS", difference: 420};

            // iterate through each friend inside friendsCopy
            for (var i = 0; i < friendsCopy.length; i++) {
                // start with totalDiff at zero
                var totalDiff = 0;
                // iterate through and compare every single score
                for (var j = 0; j < friendsCopy[i].scores.length; j++) {
                    var diff = surveyResult[j] - friendsCopy[i].scores[j];
                    // if the difference is negative, multiply by -1 (same result as absolute value)
                    if (diff < 0) {
                        diff = (-1) * diff;
                    }
                    // increment totalDiff by the difference of the individual comparison
                    totalDiff += diff;
                }
                // if we get a better match than the currently made match, overwrite currentMatch
                if (currentMatch.difference > totalDiff) {
                    currentMatch.difference = totalDiff;
                    currentMatch.name = friendsCopy[i].name;
                }
            }
            console.log(`match found: ${JSON.stringify(currentMatch)}`);
        // ========= LOGIC TO SEND BACK CLOSEST MATCH TO CLIENT =========

        }
    })

    return apiRoutes;
})();