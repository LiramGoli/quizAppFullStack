require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const riddleRouter = require("./routes/collectRiddles");
const express = require("express");
const app = express();


//middlewares
app.use(express.json());
//routes
app.use("/api/v1/riddle-collect",riddleRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
