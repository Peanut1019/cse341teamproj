const express = require("express");
const router = express.Router();
const pharmController = require("../controller/pharmacy");
//const {tryCatcher} = require("../errors/tryCatch");
const { savePharmacy } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

/**
 * @route   GET /pharmacy
 * @desc    Get all pharmacy items
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
router.post("/", isAuthenticated, savePharmacy, pharmController.addPharmacy);

/**
 * @route   PUT /pharmacy/:id
 * @desc    Update a pharmacy item
 * @param   {string} id - pharmacy item ID
 * @access  Private
 */
router.put(
  "/:id",
  isAuthenticated,
  savePharmacy,
  pharmController.updatePharmacy
);

/**
 * @route   DELETE /pharmacy/:id
 * @desc    Delete a pharmacy item
 * @param   {string} id - pharmacy item ID
 * @access  Private
 */
router.delete("/:id", isAuthenticated, pharmController.deletePharmacy);

module.exports = router;
