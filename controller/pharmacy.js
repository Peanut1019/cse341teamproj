const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res)=> {
    const result = await mongodb.getDataBase().db('shoppego').collection('pharmacy').find();
    result.toArray().then((pharmacy) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pharmacy);
    })
}

module.exports = {getAll}