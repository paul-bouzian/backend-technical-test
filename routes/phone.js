const express = require("express");
const Phone = require("../models/Phone");
const Brand = require("../models/Brand");

const router = express.Router();

router.post("/phone", async (req, res) => {
  try {
    const { model, screenSize, color, brandName } = req.body;

    //error handling if user don't send all infos needed in body
    if (!model || !screenSize || !color || !brandName) {
      return res.status(400).json({
        error: "Bad Request: Missing model, screenSize, color or brandName.",
      });
    }

    //trying to find in mongobd the brand sent in the body
    const brandRef = await Brand.findOne({ name: brandName });

    //if brandname given does not match a registered brand
    if (!brandRef) {
      return res.status(404).json({ error: "No brand found." });
    }

    //creating a new phone with infos given
    const newPhone = new Phone({
      model,
      screenSize,
      color,
      brandRef,
    });

    //saving the new phone in mongodb
    await newPhone.save();

    return res.status(201).json(newPhone);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.get("/phone", async (req, res) => {
  try {
    //getting all phones from db with "populate" to also get details of brandRef
    const phonesList = await Phone.find().populate("brandRef");

    //not really needed, but rathan than sending an empty array, it's better to send a cool message :)
    if (phonesList.length === 0) {
      return res.status(200).json({ message: "No phone registered yet." });
    }

    //sending the array of the phones
    return res.status(200).json(phonesList);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = router;
