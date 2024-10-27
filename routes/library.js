const express = require("express");
const router = express.Router();
const libraryController = require('../controller/library');
// const tryCatch = require("../errors/tryCatch");
const {saveLibrary} = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate')



/**
 * @route   GET /library
 * @desc    Get all library items
 * @access  Public
 */
router.get("/", libraryController.getAll);



/**
 * @route   GET /library/:id
 * @desc    Get a single library item by ID
 * @param   {string} id - library item ID
 * @access  Public
 */
router.get("/:id", libraryController.getOne);

/**
 * @route   POST /library
 * @desc    Add a new library item
 * @access  Private
 */
router.post("/",  isAuthenticated, saveLibrary, libraryController.addBook);

/**
 * @route   PUT /library/:id
 * @desc    Update a library item
 * @param   {string} id - library item ID
 * @access  Private
 */
router.put("/:id", isAuthenticated, saveLibrary, libraryController.updateBook);

/**
 * @route   DELETE /library/:id
 * @desc    Delete a library item
 * @param   {string} id - library item ID
 * @access  Private
 */
router.delete("/:id", isAuthenticated, saveLibrary,libraryController.deleteBook);

module.exports = router;
