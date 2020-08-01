const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      match: [/^\+91\d{10}$/, "Only Indian Numbers Allowed"],
      required: true,
      unique: true,
    },
    userAadhaarImage: {
      type: String,
      required: true,
    },
    userUUID: {
      type: String,
      required: true,
      unique: true,
    },
    aadhaarNumber: {
      type: String,
      match: [
        /^\d{4}\s\d{4}\s\d{4}$/,
        "Only Valid Aadhaar Numbers are allowed",
      ],
      unique: true,
    },
    organisations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Organisation",
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
