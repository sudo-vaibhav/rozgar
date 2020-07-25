require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
const worker = require("./routes/worker/worker");

mongoose.set("useFindAndModify", false);

//for local testing use: "mongodb://127.0.0.1:27017/hackportal
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
});

app.use("/worker", worker);
app.listen(1337);
