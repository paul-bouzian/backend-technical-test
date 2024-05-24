const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/technical-test");

//routes import
const brandRoutes = require("./routes/brand");
const phoneRoutes = require("./routes/phone");

//use of middlewares and routes
app.use(express.json());
app.use(brandRoutes);
app.use(phoneRoutes);

//getting all lost users
app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => {
  console.log("server connected");
});
