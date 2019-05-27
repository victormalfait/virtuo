"use strict";

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});

module.exports = app;
