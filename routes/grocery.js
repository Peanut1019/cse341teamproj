const express = require("express");
const router = express.Router();
const groceryController = require("../controller/grocery");

 put-post-delete
/**
 * @route   GET /grocery
 * @desc    Get all grocery item
 * @access  Public
 */
router.get("/", groceryController.getAll);


router.get('/', groceryController.getAll);
router.get('/:id', groceryController.getOne);
 main

/**
 * @route   GET /grocery/:id
 * @desc    Get a single grocery item by ID
 * @param   {string} id - grocery item ID
 * @access  Public
 */
router.get("/:id", groceryController.getOne);

/**
 * @route   POST /grocery
 * @desc    Add a new grocery item
 * @access  Private
 */
router.post("/", groceryController.addGrocery);

/**
 * @route   PUT /grocery/:id
 * @desc    Update a grocery item
 * @param   {string} id - grocery item ID
 * @access  Private
 */
router.put("/:id", groceryController.updateGrocery);

/**
 * @route   DELETE /grocery/:id
 * @desc    Delete a grocery item
 * @param   {string} id - grocery item ID
 * @access  Private
 */
router.delete("/:id", groceryController.deleteGrocery);
module.exports = router;
