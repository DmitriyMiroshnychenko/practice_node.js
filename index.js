const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const { productRouter, authRouter } = require("./routes");
const middlewares = require("./middlewares");

const { PORT, MONGO_CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.log(e.message);
    console.log(e.stack);
    process.exit(1);
  });

app.use(middlewares.handleError);
