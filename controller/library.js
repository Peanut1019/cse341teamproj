const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res)=> {
    const result = await mongodb.getDataBase().db('shoppego').collection('library').find();
    result.toArray().then((library) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(library);
    })
}

module.exports = {getAll}