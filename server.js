const express = require("express");
const app = express();
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const errorHandler = require("./errors/errorHandler");
const { notFound } = require("./errors/notFound");
const { githubAuth } = require("./config/passport-setup");
const port = process.env.PORT || 4040;

/* *****************************************
 * Middleware
 ******************************************* */
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
githubAuth(passport);

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

/* *****************************************
 * ROUTE
 ******************************************* */
app.use("/", require("./routes"));

/* *****************************************
 * Global Error Handler
 ******************************************* */
app.all("*", notFound);
app.use(errorHandler);

/* *****************************************
 * START SERVER AND C0NNECT TO DATABASE
 ******************************************* */
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
