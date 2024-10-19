const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router.get('/', userController.getAll);


module.exports = router;