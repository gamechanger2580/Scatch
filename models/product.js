const mongoose = require("mongoose");

const productSchema = {
  image: String,
  productName: String,
  productPrice: Number,
  productDiscount: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  pannelColor: String,
  textColor: String,
};

module.exports = mongoose.model("product", productSchema);
