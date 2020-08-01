const mongoose = require("mongoose");
// const skills = require("../constants/skills");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    domain: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
  },
  { timestamps: true }
);

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;
