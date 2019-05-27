const { Schema, model } = require("mongoose");
const Promise = require("bluebird");

class Station
{
  constructor() {
    const stationSchema = new Schema({
      name: {
        type: String,
        unique: true,
        minlength: 3
      },
      cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }]
    });
    this.stationModel = model("Sation", stationSchema);
  }

  add({name}) {
    const station = new this.stationModel({
      name: name
    });
    return new Promise((resolve, reject) => {
      return station.save((err, station) => {
        if (err) reject(err);
        return resolve(station);
      });
    });
  }

  findById(idStation) {
    return new Promise((resolve, reject) => {
      return this.stationModel.findById(idStation, (err, station) => {
        if (err) reject(err);
        return resolve(station);
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      return this.stationModel.find({}, (err, stations) => {
        if (err) reject(err);
        return resolve(stations);
      });
    });
  }

  update({id, name, cars}) {
    return new Promise((resolve, reject) => {
      return this.stationModel.findOneAndUpdate(
        {_id: id},
        {$set: {name: name, cars: cars}},
        {new: true},
        (err, station) => {
          if (err) reject(err);
          return resolve(station);
        });
    });
  }

  delete(idStation) {
    return new Promise((resolve, reject) => {
        this.stationModel.deleteOne({id: idStation}, (err) => {
          if (err) reject(err);
          return resolve();
        })
    });
  }
}

module.exports = new Station();
