require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json({ limit: "6mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "6mb",
    extended: true,
    parameterLimit: 50000,
  })
);;

const worker = require("./routes/worker/worker");

mongoose.set("useFindAndModify", false);

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
const port = process.env.PORT || 3000;
app.listen(port);
