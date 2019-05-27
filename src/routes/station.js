"use strict";
const express = require("express");
const router = express.Router();
const stationController = require("../controllers/station");

router.get("/", stationController.getSations);
router.get("/:idStation", stationController.getStation);
router.post("/", stationController.postStation);
router.put("/:idStation", stationController.updateStation);
router.delete("/:idStation", stationController.deleteStation);

module.exports = router;
