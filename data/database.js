const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database was previously initalized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err)
    });
};

const getDataBase = () => {
    if(!database) {
        throw Error('Database is not initalized!')
    }
    return database;
};
module.exports = {initDb, getDataBase};