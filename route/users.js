const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middleware.js");
const alluserCnt = require("../controllers/usersc.js");
router.get("/", (req, res) => {
  res.send("Welcome");
});

// sign Up route

router
  .route("/signUp")
  .get(alluserCnt.signUp1)
  .post(wrapAsync(alluserCnt.signUp2));

//Login route
router
  .route("/login")
  .get(alluserCnt.loginR)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    wrapAsync(alluserCnt.loginR2)
  );

//logOut Router
router.get("/logout", alluserCnt.logout);

module.exports = router;
