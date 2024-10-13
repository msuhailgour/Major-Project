if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const epxress = require("express");
const app = epxress();
const ejsMate = require("ejs-mate");
const path = require("path");
app.use(epxress.static(path.join(__dirname, "public")));
app.use(epxress.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layout/boilerplate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./route/listings.js");
const routers = require("./route/reviews.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRoute = require("./route/users.js");

//Connect To DB
const dbUrl = process.env.MONGO_ATLAS_DB;
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("Hello", err));
async function main() {
  await mongoose.connect(dbUrl);
}
// mongo session
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: "mysupersecretcode",
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in MONGO SESSION STORE", err);
});

//express session
const sessionOption = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
  },
};

// Use session and flash middlewares
app.use(session(sessionOption));
app.use(flash());

//passport use
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.UserInfo = req.user;
  res.locals.currUser = req.user;
  res.locals.admin = String(process.env.ADMIN);
  next();
});

// Home Route

app.use("/listings", listings);
app.use("/listins/:id/reviews", routers);
app.use("/users", userRoute);

//Error handling middelWare
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Something went wrong"));
});

app.use((err, req, res, next) => {
  let { statusCode = 404, message = "Something went wrong" } = err;

  res.render("error.ejs", { statusCode, message });
  // res.status(statusCode).send(message);
});

//Port Listener
app.listen(8080, () => {
  console.log("hi i am listenig");
});
