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

  it('should insert an item into pharmacy collection', async () => {
    const pharmacy = db.collection('pharmacy');

    const mockMed = {
        id: "67119a9f4ca665efc45767ce",
        medication_name: "Pseudoephedrine",
        dosage: "30mg",
        form: "Tablet",
        prescription_required: "No"};
    await pharmacy.insertOne(mockMed);

    const insertedMed = await pharmacy.findOne({_id: "671198e94ca665efc45767c1"});
    expect(insertedMed).toEqual(mockMed);
  });

  it('should delete an item from the pharmacy collection', async () => {
    const pharmacy = db.collection("pharmacy");
    await pharmacy.deleteMany({id: "67119a934ca665efc45767cc"});
    const deletedItem = await pharmacy.findOne({id: "67119a934ca665efc45767cc"});
    expect(deletedItem).toEqual(null);
  });
});