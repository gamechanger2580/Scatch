const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullName } = req.body;

    let exisitingUser = await userModel.findOne({ email: email });
    if (exisitingUser) {
      req.flash("error", "User already exists");
      res.status(400).redirect("/");
    }

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          return res.send(err.message);
        } else {
          const user = await userModel.create({
            fullName,
            email,
            password: hash,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "User created successfully");
          res.status(201).redirect("/");
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  bcrypt.compare(password, user.password, (error, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.status(201).redirect("/shop");
    } else {
      return res.status(400).send("Email or Password is incorrect");
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
