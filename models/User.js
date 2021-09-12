const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      min: [4, "Too short"],
      max: [20, "Too long"],
      unique: [true, "Username is taken"],
    },

    password: {
      type: String,
      required: true,
      min: [6, "Too Short"],
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      max: 140,
      default: "",
    },
    location: {
      city: {
        type: String,
        max: 30,
        default: "",
      },
      country: {
        type: String,
        max: 30,
        default: "",
      },
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
