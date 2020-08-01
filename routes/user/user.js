const Router = require("express").Router();
const User = require("../../models/User");

Router.get("/", async (req, res) => {
  User.findOne({ userUUID: req.user.user_id })
    .populate("organisations")
    .exec(function (err, result) {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
  // return res.json(req.user);
});

Router.post("/", async (req, res) => {
  const { userInfo } = req.body;
  const name = userInfo.name;
  const userUUID = req.user.user_id;
  const mobile = req.user.phone_number;
  const user = new User({
    name,
    userUUID,
    mobile,
  });
  await user.save();

  return res.json(user);
});

module.exports = Router;
