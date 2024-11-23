const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => {
    dbgr("db connected");
  })
  .catch((err) => {
    dbgr(err);
  });

// this will help to get whole control of db
// and this will help export the mongoose connection
module.exports = mongoose.connection;

// handling error : line 3
// if the mongodb for some reason did not connect then
// so to handle that we use **then and catch**

// this (mongodb://127.0.0.1:27017/scatch)is for using it locally
// but when someone else use is at that time they might fail
// so we will put dynamic value
// *************
// set DEBUG=development:* // this is for debugging
// so dbgr will be seen
// to set env as development
// $env:NODE_ENV="development"
// *************
