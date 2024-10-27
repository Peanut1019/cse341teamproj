const express = require("express");
const app = express();
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const MongoStore = require("connect-mongo");
const errorHandler = require("./errors/errorHandler");
const { notFound } = require("./errors/notFound");

const port = process.env.PORT || 4040;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
      mongoUrl: process.env.MONGODB_URL,
      dbName: "shoppego",
    }),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use("/", require("./routes"));

// authentication code here

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.username}`
      : "Logged Out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.all("*", notFound);
app.use(errorHandler);

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(
        `Database connected successfully. Server is running on port ${port}`
      );
    });
  }
});
