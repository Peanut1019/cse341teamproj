const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res)=> {
    const result = await mongodb.getDataBase().db('shoppego').collection('grocery').find();
    result.toArray().then((grocery) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(grocery);
    })
}

const getOne = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be a valid ID to work!');
    }
    const grocerId = new ObjectId(req.params.id);
    const result = await mongodb.getDataBase().db('shoppego').collection('grocery').find({_id: grocerId});
    result.toArray().then((grocery) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(grocery[0]);
    })
}


module.exports = {getAll, getOne}