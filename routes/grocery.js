const express = require('express');
const router = express.Router();
const groceryController = require('../controller/grocery');

router.get('/', groceryController.getAll);