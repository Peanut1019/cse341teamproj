const express = require('express');
const router = express.Router();
const pharmController = require('../controller/pharmacy');

const {isAuthenticated} = require('../middleware/authenticate')

router.get('/', pharmController.getAll);
router.get('/:id', pharmController.getOne);

module.exports = router;