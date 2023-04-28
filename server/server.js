require("dotenv").config();
require("express-async-errors");
// const serverless = require("serverless-http");
const connectDB = require("./db/connect");
const riddleRouter = require("./routes/collectRiddles");
const express = require("express");
const cors = require("cors");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
//routes

app.use("/api/v1/riddle-collect", riddleRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://liram:liram@cluster0.3eiygld.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
// module.exports.handler = serverless(app);
