const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res)=> {
    const reesult = await mongodb.getDataBase().db('shoppego').collection('users').find();
    reesult.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
}

module.exports = {getAll}