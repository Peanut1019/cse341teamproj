const express = require('express');
const router = express.Router();
const libraryController = require('../controller/library');

const {isAuthenticated} = require('../middleware/authenticate')

router.get('/', libraryController.getAll);
router.get('/:id', libraryController.getOne);

module.exports = router;