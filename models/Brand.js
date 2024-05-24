const mongoose = require("mongoose");

const Brand = mongoose.model("Brand", {
  name: String,
  headquarter: String,
  country: String,
});

module.exports = Brand;
