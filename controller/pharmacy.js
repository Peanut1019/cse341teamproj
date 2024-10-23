const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["pharmacy"]
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("pharmacy")
    .find();
  result.toArray().then((pharmacy) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(pharmacy);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=["pharmacy"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid ID to work!");
  }
  const pharmId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("pharmacy")
    .find({ _id: pharmId });
  result.toArray().then((pharmacy) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(pharmacy[0]);
  });
};

module.exports = { getAll, getOne };
