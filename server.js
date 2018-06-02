"use strict";

// ============================ DEPENDENCIES ============================

// look, it's my dependencies
var express = require("express");
var bodyParser = require("body-parser");

// ============================= EXPRESS.js =============================

// set up Express.js
var app = express();
var PORT = process.env.PORT || 8080; // so that I can deploy to Heroku or test locally on port 8080

// set up Express.js to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// =============================== ROUTES ===============================

// bringing my externally-defined routes in...
var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require("./app/routing/htmlRoutes");

// api calls will be at [URL-to-this-site]/api.
app.use("/api", apiRoutes);

// this makes it so that when the user hits up the root URL (aka "[URL-to-this-site]/"),
// our server serves up the routes defined in htmlRoutes.js
app.use("/", htmlRoutes);

// ========================== EXPRESS.js LISTEN =========================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});