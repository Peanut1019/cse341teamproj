const router = require("express").Router();
const passport = require("passport");

/**
 * @route   GET /
 * @desc    Checks the login status of the user. Returns a message indicating if the user is logged in or out.
 * @access  Public
 */
router.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out"
  );
});

/**
 * @route   GET /logout
 * @desc    Logs out the user, terminates the session, and redirects to the homepage.
 * @access  Public
 */
router.get("/logout", (req, res, next) => {
  //swagger.tags=['Logout']
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/"); // Redirect after logout
  });
});

/**
 * @route   GET /github/callback
 * @desc    Handles the GitHub OAuth login callback. Authenticates the user and redirects to the homepage on success.
 * @access  Public
 */
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.use("/grocery", require("./grocery"));
router.use("/library", require("./library"));
router.use("/pharmacy", require("./pharmacy"));
router.use("/users", require("./users"));
router.use("/", require("./swagger"));
router.use("/login", require("./auth"));


module.exports = router;
