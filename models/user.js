const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: Array,
  isAdmin: Boolean,
  orders: Array,
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);