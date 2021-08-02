const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const todoHandler = require("./routeHandler/todoHandler");

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z6ers.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("success"))
  .catch((err) => console.log(err));

// application route

app.use("/todo", todoHandler);
// app.use("/", todoHandler);

// custom error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerSend) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);

app.listen(3000, () => {
  console.log("application started at 3000");
});
