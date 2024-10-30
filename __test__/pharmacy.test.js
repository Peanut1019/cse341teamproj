const {
    getOne,
    getAll,
    addPharmacy,
    updatePharmacy,
    deletePharmacy,
  } = require("../controller/pharmacy");
  const mongodb = require("../data/database");
  const { ObjectId } = require("mongodb");
  
  jest.mock("mongodb", () => ({
    connect: jest.fn(),
    ObjectId: Object.assign(jest.fn(), {
      isValid: jest.fn(() => false),
    }),
  }));
  jest.mock("../data/database", () => ({
    getDataBase: jest.fn(() => ({
      db: jest.fn(() => ({
        collection: jest.fn(() => ({
          find: jest.fn(() => ({
            toArray: jest.fn().mockResolvedValue([
              { name: "Insulin Glargine", category: "Injection" },
              { name: "Amoxicillin", category: "Capsule" },
            ]),
          })),
          insertOne: jest.fn(() => ({
            insertedId: "1234567890",
          })),
          updateOne: jest.fn(() => ({
            modifiedCount: 2,
          })),
          deleteOne: jest.fn(() => ({
            deletedCount: 1,
          })),
        })),
      })),
    })),
  }));
  
  const mockReq = {
    params: {
      id: "671d5e065582519d07791206",
    },
    body: {
        medication_name: "Advil",
        dosage: "50mg",
        form: "Tablet",
        prescription_required: "No",
    },
  };
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    setHeader: jest.fn(),
  };
  describe("get users", () => {
    test("Should get all pharmacy", async () => {
      await getAll(mockReq, mockRes);
      expect(mongodb.getDataBase).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });
  
    test("Should return a 400 status code for getOne", async () => {
      await getOne(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
      expect(ObjectId.isValid).toHaveBeenCalledWith(mockReq.params.id);
    });
  
    test("Should return status of 200 and the med created", async () => {
      jest.spyOn(ObjectId, "isValid").mockImplementationOnce(() => ({
        isValid: jest.fn(() => true),
      }));
      await getOne(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mongodb.getDataBase).toHaveBeenCalled();
      expect(mockRes.setHeader).toHaveBeenCalledWith(
        "Content-Type",
        "application/json"
      );
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
  
  describe("create & update pharmacy", () => {
    test("Should add pharmacy to db and return status 201", async () => {
      await addPharmacy(mockReq, mockRes);
      expect(mongodb.getDataBase).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pharmacy item added successfully",
        data: "1234567890",
      });
    });
  
    test("Should update pharmacy in db and return status 200 and success message", async () => {
      await updatePharmacy(mockReq, mockRes);
      // Assertions
      expect(mongodb.getDataBase).toHaveBeenCalled(); // Check if getDataBase was called
      expect(mockRes.status).toHaveBeenCalledWith(200); // Check if status 200 was set
      expect(mockRes.json).toHaveBeenCalledWith({
        message:
          "Pharmacy item with ID 671d5e065582519d07791206 updated successfully",
      }); // Adjust as necessary
    });
  
    test("Should return status 404 and failure message", async () => {
      jest.spyOn(mongodb, "getDataBase").mockImplementationOnce(() => ({
        db: jest.fn(() => ({
          collection: jest.fn(() => ({
            updateOne: jest.fn().mockResolvedValue({ modifiedCount: 0 }),
          })),
        })),
      }));
      await updatePharmacy(mockReq, mockRes);
      expect(mongodb.getDataBase).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pharmacy item not found",
      });
    });
  });
  
  describe("Delete pharmacy", () => {
    test("Should delete pharmacy in db and return status 200 and sucess message", async () => {
      await deletePharmacy(mockReq, mockRes);
      // Assertions
      expect(mongodb.getDataBase).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pharmacy item deleted successfully",
      });
    });
  
    test("Should return status 404 and failure message", async () => {
      jest.spyOn(mongodb, "getDataBase").mockImplementationOnce(() => ({
        db: jest.fn(() => ({
          collection: jest.fn(() => ({
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 }),
          })),
        })),
      }));
      await deletePharmacy(mockReq, mockRes);
      expect(mongodb.getDataBase).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pharmacy item not found",
      });
    });
  });