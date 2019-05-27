const { Schema, model } = require("mongoose");

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
}

module.exports = new Station();
