const mongoose = require('mongoose')

let Ownership = new mongoose.Schema({
  vehicleId: { type: mongoose.Types.ObjectId, ref: "Vehicle" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ownership", Ownership)