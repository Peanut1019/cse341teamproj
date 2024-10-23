const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["users"]
  const reesult = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("users")
    .find();
  reesult.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=["users"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid ID to work!");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("users")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

module.exports = { getAll, getOne };
