const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerValidation = require("../validations/registerValidation");
router.post("/register", async (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  if (isValid()) {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hash,
      email,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } else {
    console.log("Errors", errors);
  }
});

router.post("/login", (req, res) => {
  res.send("THIS IS LOGIN ENDPOINT");
});

module.exports = router;
