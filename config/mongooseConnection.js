const mongoose = require("mongoose");

// handling error
// if the mongodb for some reason did not connect then
// so to handle that we use **then and catch**

// this (mongodb://127.0.0.1:27017/scatch)is for using it locally 
// but when someone else use is at that time they might fail
// so we will put dynamic value
mongoose
  .connect("mongodb://127.0.0.1:27017/scatch")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// this will help to get whole control of db
// and this will help export the mongoose connection
module.exports = mongoose.connection;
