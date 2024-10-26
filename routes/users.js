const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
const tryCatch = require("../errors/tryCatch");

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get("/", tryCatch(userController.getAll));

/**
 * @route   GET /users/:id
 * @desc    Get a single user by ID
 * @param   {string} id - user ID
 * @access  Public
 */
router.get("/:id", tryCatch(userController.getOne));

/**
 * @route   POST /users
 * @desc    Add a new user
 * @access  Private
 */
router.post("/", tryCatch(userController.addUser));

/**
 * @route   PUT /users/:id
 * @desc    Update a user
 * @param   {string} id - user ID
 * @access  Private
 */
router.put("/:id", tryCatch(userController.updateUser));

/**
 * @route   DELETE /users/:id
 * @desc    Delete a user
 * @param   {string} id - user ID
 * @access  Private
 */
router.delete("/:id", tryCatch(userController.deleteUser));

module.exports = router;
