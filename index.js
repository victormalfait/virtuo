"use strict";

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8080;

const dev_db_url = "mongodb://localhost:27017/virtuo";
const options = {
  useNewUrlParser: true
};

mongoose.connect(dev_db_url, options);
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
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
