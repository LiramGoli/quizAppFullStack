const { ok } = require("assert");
const Riddles = require("../models/Riddles");
const { StatusCodes } = require("http-status-codes");


const getAllRiddles = async (req, res) => {
  try {
    const riddles = await Riddles.find().sort("id");
    res.send(riddles);
  } catch (error) {
    res.send(error);
  }
};

const createRiddle = async (req, res) => {
  const { id } = req.params;
  try {
    const riddle = await Riddles.findOneAndUpdate(
      { id: id },
      { $inc: { totalSeen: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.send(riddle);
  } catch (error) {
    res.send(error);
  }
};

const updateRiddle = async (req, res) => {
  const { id } = req.params;
  const { solved, hints, answer } = req.body;
  try {
    let updateObj = {};
    if (solved) {
      updateObj.totalSolved = 1;
    }
    if (hints) {
      updateObj.totalUsedHints = 1;
    }
    if (answer) {
      updateObj.totalUsedAnswer = 1;
    }
    const riddle = await Riddles.findOneAndUpdate(
      { id: id },
      { $inc: updateObj },
      { new: true, upsert: true }
    );
    res.send(riddle);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllRiddles,
  createRiddle,
  updateRiddle,
};
