const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["grocery, getAll"]
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("grocery")
    .find();
  return result.toArray().then((grocery) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(grocery);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=["grocery, getOne"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid ID to work!");
  }
  const grocerId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDataBase()
    .db("shoppego")
    .collection("grocery")
    .find({ _id: grocerId });

  return result.toArray().then((grocery) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(grocery);
  });
};

const addGrocery = async (req, res) => {
  // #swagger.tags=["grocery, addGrocery"]
  try {
    const db = await mongodb.getDataBase().db("shoppego");
    const groceryCollection = db.collection("grocery");
    const { item_name, price, store } = req.body;
    const newGrocery = {
      item_name,
      price,
      store,
    };
    const result = await groceryCollection.insertOne(newGrocery);
    return res.status(201).json({
      message: "Grocery item added successfully",
      data: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding grocery:", error);
    res.status(500).json({ message: "Failed to add grocery item", error });
  }
};

const updateGrocery = async (req, res) => {
  // #swagger.tags=["grocery, updateGrocery"]
  try {
    const db = await mongodb.getDataBase().db("shoppego");
    const groceryCollection = db.collection("grocery");
    const groceryId = req.params.id;
    const updatedData = req.body;

    const result = await groceryCollection.updateOne(
      { _id: new ObjectId(groceryId) },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        message: `Grocery item with ID ${groceryId} updated successfully`,
      });
    } else {
      res.status(404).json({ message: "Grocery item not found" });
    }
  } catch (error) {
    console.error("Error updating grocery:", error);
    res.status(500).json({ message: "Failed to update grocery item", error });
  }
};

const deleteGrocery = async (req, res) => {
  // #swagger.tags=["grocery, deleteGrocery"]
  try {
    const db = await mongodb.getDataBase().db("shoppego");
    const groceryCollection = db.collection("grocery");
    const groceryId = req.params.id;
    const result = await groceryCollection.deleteOne({
      _id: new ObjectId(groceryId),
    });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Grocery item deleted successfully" });
    } else {
      res.status(404).json({ message: "Grocery item not found" });
    }
  } catch (error) {
    console.error("Error deleting grocery:", error);
    res.status(500).json({ message: "Failed to delete grocery item", error });
  }
};

module.exports = { getAll, getOne, addGrocery, updateGrocery, deleteGrocery };
