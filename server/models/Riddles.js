const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RiddleSchema = new Schema({
  id: { type: String, unique: true, required: true },
  difficulty: { type: Number, enum: [1, 2, 3], required: true },
  totalSeen: { type: Number, default: 1, required: true },
  totalSolved: { type: Number, default: 0, required: true },
  totalUsedHints: { type: Number, default: 0, required: true },
  totalUsedAnswer: { type: Number, default: 0, required: true },
});

const Riddle = mongoose.model("riddle", RiddleSchema);

module.exports = Riddle;
