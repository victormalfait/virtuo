const { Schema, model } = require("mongoose");

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
    this.stationModel = model("Car", carSchema);
  }
}

module.exports = new Car();
