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
);
app.use(bodyParser.json());

//importing mongoose models
const Organisation = require("./models/Organisation");
const Worker = require("./models/Worker");
const User = require("./models/User");
const workerRouter = require("./routes/worker/worker");
const userRouter = require("./routes/user/user");

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const checkAuth = require("./middlewares/checkAuth");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  await Promise.all([Organisation.init(), Worker.init(), User.init()]);
  console.log("db connected");
  app.use("/worker", workerRouter);
  app.use("/user", checkAuth, userRouter);
});

const port = process.env.PORT || 3000;
app.listen(port);
