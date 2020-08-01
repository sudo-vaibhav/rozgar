const Router = require("express").Router();

const axios = require("axios");

const saveWorker = require("../../functions/worker/saveWorker/saveWorker");
const searchWorkers = require("../../functions/worker/searchWorkers/searchWorkers");
const bulkadd = require("../../functions/worker/bulkAdd/bulkAdd");
const checkAuth = require("../../middlewares/checkAuth");

Router.get(
  "/",
  // checkAuth,
  searchWorkers
);

Router.post("/bulkadd", checkAuth, bulkadd);
Router.post("/message", async (req, res) => {
  console.log("received message/worker create request");
  const { message, sender } = req.body;

  //message structure
  // first 6 digits of pin code
  // then space
  // then 1 based index of skill
  const [pinCode, skillIndex] = message.trim().split(" ");
  console.log("message trim split", message.trim().split(" "));
  const resp = await axios.get(
    `https://api.postalpincode.in/pincode/${pinCode}`
  );
  const district = resp.data[0].PostOffice[0].District;
  console.log("district for send message : ", district);

  // const { status, payload } =
  const { status, payload } = await saveWorker(
    sender,
    skillIndex,
    pinCode,
    district,
    false
  );
  return res.status(status).send(payload);
});

module.exports = Router;
