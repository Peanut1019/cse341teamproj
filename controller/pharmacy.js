const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["pharmacy, getAll"]
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
  //#swagger.tags=["pharmacy, getOne"]
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

const addPharmacy = async (req, res) => {
    // #swagger.tags=["pharmacy, addPharmacy"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const pharmacyCollection = db.collection("pharmacy");
      const { medication_name, dosage, form, prescription_required } = req.body;
      const newPharmacy = {
        medication_name,
        dosage,
        form,
        prescription_required
      };
      const result = await pharmacyCollection.insertOne(newPharmacy);
      return res.status(201).json({
        message: "Pharmacy item added successfully",
        data: result.insertedId,
      });
    } catch (error) {
      console.error("Error adding phamacy:", error);
      res.status(500).json({ message: "Failed to add pharmacy item", error });
    }
  };
  
  const updatePharmacy = async (req, res) => {
    // #swagger.tags=["pharmacy, updatePharmacy"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const pharmacyCollection = db.collection("pharmacy");
      const pharmacyId = req.params.id;
      const updatedData = req.body;
  
      const result = await pharmacyCollection.updateOne(
        { _id: new ObjectId(pharmacyId) },
        { $set: updatedData }
      );
  
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          message: `Grocery item with ID ${pharmacyId} updated successfully`,
        });
      } else {
        res.status(404).json({ message: "Pharmacy item not found" });
      }
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      res.status(500).json({ message: "Failed to update pharmacy item", error });
    }
  };
  
  const deletePharmacy = async (req, res) => {
    // #swagger.tags=["pharmacy, deletePharmacy"]
    try {
      const db = await mongodb.getDataBase().db("shoppego");
      const pharmacyCollection = db.collection("pharmacy");
      const pharmacyId = req.params.id;
      const result = await pharmacyCollection.deleteOne({
        _id: new ObjectId(pharmacyId),
      });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Pharmacy item deleted successfully" });
      } else {
        res.status(404).json({ message: "Pharmacy item not found" });
      }
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      res.status(500).json({ message: "Failed to delete pharmacy item", error });
    }
  };

module.exports = { getAll, getOne, addPharmacy, updatePharmacy, deletePharmacy };
