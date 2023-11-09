const mongoose = require('mongoose')

let User = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  phone: { type: String },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User)