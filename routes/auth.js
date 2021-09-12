const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerValidation = require("../validations/registerValidation");
router.post("/register", (req, res) => {
  console.log("registering user");
  // const { errors, isValid } = registerValidation(req.body);

  // if (isValid()) {
  //   const { username, email, password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const hash = await bcrypt.hash(password, salt);

  //   const newUser = new User({
  //     username,
  //     password: hash,
  //     email,
  //   });

  // const user = await newUser.save();
  //   res.status(200).json(newUser);
  // } else {
  //   console.log("Errors", errors);
  // }

  res.status(200).json("success registering");
});

router.post("/login", (req, res) => {
  res.send("THIS IS LOGIN ENDPOINT");
});

router.get("/profile", (req, res) => {
  res.status(200).json({ name: "abdul", id: "43453" });
});
module.exports = router;
