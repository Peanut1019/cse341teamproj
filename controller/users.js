const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["users, getAll"]
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
  //#swagger.tags=["users, getOne"]
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

const addUser = async (req, res) => {
    // #swagger.tags=["users, addUser"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const usersCollection = db.collection("users");
      const { first_name, last_name, username, email, role, status } = req.body;
      const newUser = {
        first_name,
        last_name,
        username,
        email,
        role,
        status
      };
      const result = await usersCollection.insertOne(newUser);
      return res.status(201).json({
        message: "User added successfully",
        data: result.insertedId,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Failed to add user", error });
    }
  };
  
  const updateUser = async (req, res) => {
    // #swagger.tags=["users, updateUser"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const usersCollection = db.collection("users");
      const userId = req.params.id;
      const updatedData = req.body;
  
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: updatedData }
      );
  
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          message: `User with ID ${userId} updated successfully`,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user", error });
    }
  };
  
  const deleteUser = async (req, res) => {
    // #swagger.tags=["users, deleteUser"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const usersCollection = db.collection("users");
      const userId = req.params.id;
      const result = await usersCollection.deleteOne({
        _id: new ObjectId(userId),
      });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user", error });
    }
  };

module.exports = { getAll, getOne, addUser, updateUser, deleteUser };
