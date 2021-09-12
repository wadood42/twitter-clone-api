const express = require("express");
const mongoose = require("mongoose");
// const nodemon = require("nodemon");
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config({ path: "./configs/.env" });

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECT TO MONGODB");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("LISTENING ON PORT ", PORT);
    });
  })
  .catch((err) => {
    console.log("ERROR CONNECTING TO MONGODB", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.use("/hello", (req, res) => {
  console.log("hello");
  res.send("Hello");
});

app.use("/", authRoutes);

app.use("/hello", (req, res) => {
  res.send("Welcome Abdul");
});
