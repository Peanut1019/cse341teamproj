const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res)=> {
    const result = await mongodb.getDataBase().db('shoppego').collection('grocery').find();
    result.toArray().then((grocery) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(grocery);
    })
}

module.exports = {getAll}