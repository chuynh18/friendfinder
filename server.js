"use strict";

// ============================ DEPENDENCIES ============================

// look, it's my dependencies
var express = require("express");
var bodyParser = require("body-parser");

// ============================= EXPRESS.js =============================

// set up Express.js
var app = express();
var PORT = process.env.PORT || 8080;

// set up the Express.js to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// =============================== ROUTES ===============================

// bringing my routes in...
var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require("./app/routing/htmlRoutes");

// app.use("/apiRoutes", apiRoutes);
app.use("/", htmlRoutes);

// ========================== EXPRESS.js LISTEN =========================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});