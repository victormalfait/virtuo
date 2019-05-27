"use strict";

const CarModel = require("../models/car");

class CarController {
  getCars(req, res, next) {
    CarModel.findAll()
      .then((cars) => {
        res.status(200);
        res.json({cars: cars});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  getCar(req, res, next) {
    CarModel.findById(req.params.idCar)
      .then((car) => {
        res.status(200).json({car: car});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  postCar(req, res, next) {
    CarModel.add({name: req.body.name, available: req.body.available})
      .then((car) => {
        res.status(201).json({car: car});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  updateCar(req, res, next) {
    CarModel.findById(req.params.idCar).then((car) => {
      CarModel.update({
        id: car.id,
        name: car.name,
        available: car.available
      })
        .then(() => {
          res.status(201).json({car: car});
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }

  deleteCar(req, res, next) {

  };
}

module.exports = new CarController();
