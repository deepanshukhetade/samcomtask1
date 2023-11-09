const mongoose = require('mongoose')

let Vehicle = new mongoose.Schema({
  vehicleName: { type: String },
  vehicleBrand: { type: String },
  vehicleNumber: { type: String },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vehicle", Vehicle)