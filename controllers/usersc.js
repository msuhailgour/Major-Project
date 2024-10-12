const User = require("../models/user.js");

module.exports.signUp1 = (req, res) => {
  res.render("./users/signUp.ejs");
};

module.exports.signUp2 = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const nUser = new User({
      email: email,
      username: username,
    });

    let rtd = await User.register(nUser, password);
    req.login(rtd, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "New User Enrolled");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/signUp");
  }
};

module.exports.loginR = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.loginR2 = async (req, res) => {
  try {
    req.flash("success", "Welcome To Wanderlust");

    const rlr = res.locals.redirectUrl || "/listings";

    res.redirect(rlr);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/signUp");
  }
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged You Out!");
    res.redirect("/listings");
  });
};
