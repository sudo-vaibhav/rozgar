const Router = require("express").Router();
const User = require("../../models/User")

Router.get("/", (req, res) => {
  // User.findOne({
  //   userUUID : req.user
  // })
  return res.json(req.user);
});

Router.post("/", (req, res) => {
  return res.json({ m: "hi" });
});

module.exports = Router;
