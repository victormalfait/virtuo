"use strict";

const StationModel = require("../models/Station");

class StationController {
  getSations(req, res, next) {
    StationModel.findAll()
      .then((stations) => {
        res.status(200);
        res.json({stations: stations});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  getStation(req, res, next) {
    StationModel.findById(req.params.idStation)
      .then((station) => {
        res.status(200).json({station: station});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  postStation(req, res, next) {
    StationModel.add({name: req.body.name})
      .then((station) => {
        res.status(201).json({station: station});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  updateStation(req, res, next) {
    StationModel.findById(req.params.idStation).then((station) => {
      StationModel.update({
        id: station.id,
        name: station.name
      })
        .then(() => {
          res.status(201).json({station: station});
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }

  deleteStation(req, res, next) {
    StationModel.delete(req.params.idStation).then(() => {
      res.status(204)
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = new StationController();
