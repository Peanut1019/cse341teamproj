const express = require('express');
const router = express.Router();
const groceryController = require('../controller/grocery');

const {isAuthenticated} = require('../middleware/authenticate')

router.get('/', isAuthenticated, groceryController.getAll);
router.get('/:id', groceryController.getOne);


module.exports = router;