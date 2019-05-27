const { Schema, model } = require("mongoose");
const Promise = require("bluebird");

class Car
{
  constructor() {
    const carSchema = new Schema({
      name: {
        type: String,
        unique: true,
        minlength: 3
      },
      available: Boolean
    });
    this.carModel = model("Car", carSchema);
  }

  add({name, available}) {
    const car = new this.carModel({
      name: name,
      available: available
    });
    return new Promise((resolve, reject) => {
      return car.save((err, car) => {
        if (err) reject(err);
        return resolve(car);
      });
    });
  }

  findById(idCar) {
    return new Promise((resolve, reject) => {
      return this.carModel.findById(idCar, (err, car) => {
        if (err) reject(err);
        return resolve(car);
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      return this.carModel.find({}, (err, cars) => {
        if (err) reject(err);
        return resolve(cars);
      });
    });
  }

  update({id, name, available}) {
    return new Promise((resolve, reject) => {
      return this.carModel.findOneAndUpdate(
        {_id: id},
        {$set: {name: name, available: available}},
        {new: true},
        (err, car) => {
          if (err) reject(err);
          return resolve(car);
        });
    });
  }

  delete(idCar) {
    return new Promise((resolve, reject) => {
        this.carModel.deleteOne({id: idCar}, (err) => {
          if (err) reject(err);
          return resolve();
        })
    });
  }

  remove() {
    return new Promise((resolve, reject) => {
      this.carModel.remove({}, err => {
        if (err) reject(err);
        return resolve();
      })
    });
  }
}

module.exports = new Car();
