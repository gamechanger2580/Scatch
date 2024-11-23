const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgColor, pannelColor, textColor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      pannelColor,
      textColor,
    });
    req.flash("success", "Product added successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
