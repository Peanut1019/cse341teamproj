const express = require("express");
const router = express.Router();
const userController = require('../controller/users');
// const tryCatch = require("../errors/tryCatch");
const {saveUser} = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate')

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get("/", userController.getAll);

/**
 * @route   GET /users/:id
 * @desc    Get a single user by ID
 * @param   {string} id - user ID
 * @access  Public
 */
router.get("/:id", userController.getOne);

/**
 * @route   POST /users
 * @desc    Add a new user
 * @access  Private
 */
router.post("/", isAuthenticated, saveUser, userController.addUser);

/**
 * @route   PUT /users/:id
 * @desc    Update a user
 * @param   {string} id - user ID
 * @access  Private
 */
router.put("/:id", isAuthenticated, saveUser, userController.updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Delete a user
 * @param   {string} id - user ID
 * @access  Private
 */
router.delete("/:id", isAuthenticated, saveUser, userController.deleteUser);

module.exports = router;
