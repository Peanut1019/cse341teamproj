const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["library, getAll"]
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
  //#swagger.tags=["library, getOne"]
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

const addBook = async (req, res) => {
    // #swagger.tags=["library, addBook"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const libraryCollection = db.collection("library");
      const { book_id, additionalInfo, series, title, author_first, author_middle, author_last, order_in_series} = req.body;
      const newLibrary = {
        book_id, 
        additionalInfo, 
        series, 
        title, 
        author_first, 
        author_middle, 
        author_last, 
        order_in_series
      };
      const result = await libraryCollection.insertOne(newLibrary);
      return res.status(201).json({
        message: "Library item added successfully",
        data: result.insertedId,
      });
    } catch (error) {
      console.error("Error adding grocery:", error);
      res.status(500).json({ message: "Failed to add grocery item", error });
    }
  };
  
  const updateBook = async (req, res) => {
    // #swagger.tags=["library, updateBook"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const libraryCollection = db.collection("library");
      const libraryId = req.params.id;
      const updatedData = req.body;
  
      const result = await libraryCollection.updateOne(
        { _id: new ObjectId(libraryId) },
        { $set: updatedData }
      );
  
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          message: `Library item with ID ${libraryId} updated successfully`,
        });
      } else {
        res.status(404).json({ message: "Library item not found" });
      }
    } catch (error) {
      console.error("Error updating library:", error);
      res.status(500).json({ message: "Failed to update library item", error });
    }
  };
  
  const deleteBook = async (req, res) => {
    // #swagger.tags=["library, deleteBook"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const libraryCollection = db.collection("library");
      const libraryId = req.params.id;
      const result = await libraryCollection.deleteOne({
        _id: new ObjectId(libraryId),
      });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Library item deleted successfully" });
      } else {
        res.status(404).json({ message: "Library item not found" });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Failed to delete book", error });
    }
  };

module.exports = { getAll, getOne, addBook, updateBook, deleteBook };
