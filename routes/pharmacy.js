const express = require('express');
const router = express.Router();
const pharmController = require('../controller/pharmacy');

router.get('/', pharmController.getAll);
router.get('/:id', pharmController.getOne);

module.exports = router;