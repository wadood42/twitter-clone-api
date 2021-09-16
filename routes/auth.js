const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerValidation = require("../validations/registerValidation");

const generateToken = async (user) => {
  const token = await jwt.sign(
    {
      id: user.id,
      username: user.username,
      followings: user.followings,
      followers: user.followers,
    },
    process.env.SECRET_KEY
  );

  return token;
};
router.post("/register", async (req, res) => {
  console.log("registering user", req.body);

  const { errors, isValid } = registerValidation(req.body);
  console.log("Errors", errors);

  if (isValid()) {
    const { username, email, password, firstname, lastname } = req.body;

    const { month, year, day } = req.body.dateOfBirth;

    let date_of_birth = new Date(year, month, day).toString();

    console.log("date of birth", date_of_birth);

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hash,
        email,
        firstname,
        lastname,
        date_of_birth,
      });
      const user = await newUser.save();
      const token = await generateToken(user);
      res.status(200).json({ user: user, token: token });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  } else {
    res.status(500).json({ errors: errors });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(400).json("incorrect password");
    }

    const token = await generateToken(user);

    res.status(200).json({ token: token, user: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {
  res.status(200).json({ name: "abdul", id: "43453" });
});
module.exports = router;
