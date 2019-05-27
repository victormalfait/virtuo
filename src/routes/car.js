"use strict";
const express = require("express");
const router = express.Router();
const carController = require("../controllers/car");

router.get("/", carController.getCars);
router.get("/:idCar", carController.getCar);
router.post("/", carController.postCar);
router.put("/:idCar", carController.updateCar);
router.delete("/:idCar", carController.deleteCar)

module.exports = router;
