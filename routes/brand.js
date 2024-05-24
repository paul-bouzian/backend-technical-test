const express = require("express");
const Brand = require("../models/Brand");

const router = express.Router();

router.post("/brand", async (req, res) => {
  try {
    const { name, headquarter, country } = req.body;

    //error handling if user don't send all infos needed in body
    if (!name || !headquarter || !country) {
      return res
        .status(400)
        .json({ error: "Bad Request: Missing name, headquarter or country." });
    }

    //creating a new brand with infos given
    const newBrand = new Brand({
      name,
      headquarter,
      country,
    });

    //saving in mongodb the new brand
    await newBrand.save();

    return res.status(201).json(newBrand);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
