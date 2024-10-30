const {
  getOne,
  getAll,
  addGrocery,
  updateGrocery,
  deleteGrocery,
} = require("../controller/grocery");
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
            { name: "Apple", category: "Fruit" },
            { name: "Bread", category: "Bakery" },
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
    id: "671199684ca665efc45767c4",
  },
  body: {
    item_name: "bread",
    price: "5.99",
    store: "1",
  },
};
const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
  setHeader: jest.fn(),
};
describe("get users", () => {
  test("Should get all grocery", async () => {
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

  test("Should return status of 200 and the user created", async () => {
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

describe("create & update grocery", () => {
  test("Should add grocery to db and return status 201", async () => {
    await addGrocery(mockReq, mockRes);
    expect(mongodb.getDataBase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Grocery item added successfully",
      data: "1234567890",
    });
  });

  test("Should update grocery in db and return status 200 and sucess message", async () => {
    await updateGrocery(mockReq, mockRes);
    // Assertions
    expect(mongodb.getDataBase).toHaveBeenCalled(); // Check if getDataBase was called
    expect(mockRes.status).toHaveBeenCalledWith(200); // Check if status 200 was set
    expect(mockRes.json).toHaveBeenCalledWith({
      message:
        "Grocery item with ID 671199684ca665efc45767c4 updated successfully",
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
    await updateGrocery(mockReq, mockRes);
    expect(mongodb.getDataBase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Grocery item not found",
    });
  });
});

describe("Delete grocery", () => {
  test("Should delete grocery in db and return status 200 and sucess message", async () => {
    await deleteGrocery(mockReq, mockRes);
    // Assertions
    expect(mongodb.getDataBase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Grocery item deleted successfully",
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
    await deleteGrocery(mockReq, mockRes);
    expect(mongodb.getDataBase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Grocery item not found",
    });
  });
});
