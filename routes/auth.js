const router = require("express").Router();
const passport = require("passport");

/**
 * @route   GET /login/github
 * @desc    Initiates the GitHub OAuth authentication process for user login.
 * @access  Public
 */
router.get("/github", passport.authenticate("github"), (req, res) => {});

module.exports = router;
