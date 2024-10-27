const router = require("express").Router();
const passport = require("passport");
const { tryCatcher } = require("../errors/tryCatch");

router.use("/", require("./swagger"));

router.use("/grocery", require("./grocery"));
router.use("/library", require("./library"));
router.use("/pharmacy", require("./pharmacy"));
router.use("/users", require("./users"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get(
  //swagger.tags=['Logout']
  "/logout",
  tryCatcher(function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })
);

router.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out"
  );
});

module.exports = router;
