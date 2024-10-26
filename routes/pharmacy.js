const express = require("express");
const router = express.Router();
const pharmController = require("../controller/pharmacy");
const tryCatch = require("../errors/tryCatch");

/**
 * @route   GET /pharmacy
 * @desc    Get all pharmacy items
 * @access  Public
 */
router.get("/", tryCatch(pharmController.getAll));

/**
 * @route   GET /pharmacy/:id
 * @desc    Get a single pharmacy item by ID
 * @param   {string} id - pharmacy item ID
 * @access  Public
 */
router.get("/:id", tryCatch(pharmController.getOne));

/**
 * @route   POST /pharmacy
 * @desc    Add a new pharmacy item
 * @access  Private
 */
router.post("/", tryCatch(pharmController.addPharmacy));

/**
 * @route   PUT /pharmacy/:id
 * @desc    Update a pharmacy item
 * @param   {string} id - pharmacy item ID
 * @access  Private
 */
router.put("/:id", tryCatch(pharmController.updatePharmacy));

/**
 * @route   DELETE /pharmacy/:id
 * @desc    Delete a pharmacy item
 * @param   {string} id - pharmacy item ID
 * @access  Private
 */
router.delete("/:id", tryCatch(pharmController.deletePharmacy));

module.exports = router;
