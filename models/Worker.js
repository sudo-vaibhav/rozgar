const mongoose = require("mongoose");
const skills = require("../constants/skills");

const workerSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      enum: skills,
      required: true,
    },
    pinCode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "invalid pin code"],
      required: true,
    },
    mobile: {
      type: String,
      match: [/^\+91\d{10}$/, "Valid Indian numbers allowed only"],
      required: true,
      unique: true,
    },
    district: {
      type: String,
    },
    organisationMember: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
