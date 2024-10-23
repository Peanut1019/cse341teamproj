const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["library"]
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("library")
    .find();
  result.toArray().then((library) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(library);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=["library"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid ID to work!");
  }
  const libraId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("library")
    .find({ _id: libraId });
  result.toArray().then((library) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(library[0]);
  });
};

module.exports = { getAll, getOne };
