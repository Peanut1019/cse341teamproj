const dotenv = require('dotenv');
dotenv.config();
const {MongoClient} = require('mongodb');
describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("shoppego");
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert an item into users collection', async () => {
    const users = db.collection('users');

    const mockUser = {
      id: "671198e94ca665efc45767c1",
      first_name: "Gandalf",
      last_name: "the Grey",
      username: "thouShalln0tPass",
      email: "theGrey@wizards.com",
      role: "Admin",
      status: "active"};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: "671198e94ca665efc45767c1"});
    expect(insertedUser).toEqual(mockUser);
  });
  it('should delete an item from the users collection', async () => {
    const users = db.collection("users");
    await users.deleteMany({id: "671198bb4ca665efc45767be"});
    const deletedItem = await users.findOne({id: "671198bb4ca665efc45767be"});
    expect(deletedItem).toEqual(null);
  });
});