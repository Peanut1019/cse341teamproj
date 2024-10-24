const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get("/", userController.getAll);



/**
 * @route   GET /users/:id
 * @desc    Get a single users by ID
 * @param   {string} id - users ID
 * @access  Public
 */
router.get("/:id", userController.getOne);

/**
 * @route   POST /users
 * @desc    Add a new user
 * @access  Private
 */
router.post("/", userController.addUser);

/**
 * @route   PUT /users/:id
 * @desc    Update a user
 * @param   {string} id - users ID
 * @access  Private
 */
router.put("/:id", userController.updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Delete a user
 * @param   {string} id - users ID
 * @access  Private
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;