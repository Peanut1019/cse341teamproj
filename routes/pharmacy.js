const express = require('express');
const router = express.Router();
const pharmController = require('../controller/pharmacy');

/**
 * @route   GET /pharmacy
 * @desc    Get all pharmacy item
 * @access  Public
 */
router.get("/", pharmController.getAll);



/**
 * @route   GET /pharmacy/:id
 * @desc    Get a single pharmacy item by ID
 * @param   {string} id - pharmacy item ID
 * @access  Public
 */
router.get("/:id", pharmController.getOne);

/**
 * @route   POST /pharmacy
 * @desc    Add a new pharmacy item
 * @access  Private
 */
router.post("/", pharmController.addPharmacy);

/**
 * @route   PUT /pharmacy/:id
 * @desc    Update a pharmacy item
 * @param   {string} id - pharmacy item ID
 * @access  Private
 */
router.put("/:id", pharmController.updatePharmacy);

/**
 * @route   DELETE /pharmacy/:id
 * @desc    Delete a pharmacy item
 * @param   {string} id - pharmacy item ID
 * @access  Private
 */
router.delete("/:id", pharmController.deletePharmacy);

module.exports = router;