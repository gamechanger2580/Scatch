const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners");

// this is for testing and owner will be created only in
// development phase // after deployment this route will not be present
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    // if there is one owner from begining then one more owner cannot be made
    if (owners.length > 0)
      return res.status(500).send("You dont have permission to create owner");

    let { fullName, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });
    res.status(201).send("We can create owner");
  });
}

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
