require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());

//importing mongoose models
const Organisation = require("./models/Organisation");
const Worker = require("./models/Worker");

const worker = require("./routes/worker/worker");

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  await Promise.all([Organisation.init(), Worker.init()]);
  console.log("db connected");
  app.use("/worker", worker);
});

const port = process.env.PORT || 3000;
app.listen(port);
