const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "RiddlesInfo",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
