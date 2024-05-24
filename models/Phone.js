const mongoose = require("mongoose");

const Phone = mongoose.model("Phone", {
  model: String,
  screenSize: Number,
  color: String,
  brandRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
});

module.exports = Phone;
