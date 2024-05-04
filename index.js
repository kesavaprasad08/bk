const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoutes = require("./routes/user");
const scriptRoutes = require("./routes/script");
app.use("/script", scriptRoutes);
app.use("/auth", userRoutes);
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });