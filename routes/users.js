const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

const {isAuthenticated} = require('../middleware/authenticate')

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);

module.exports = router;