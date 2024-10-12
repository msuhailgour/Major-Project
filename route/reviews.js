const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewShema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLogin, isAuthor } = require("../views/middleware.js");
const allReviewCnt = require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
  let { error } = reviewShema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

//Create Review
router.post("/", isLogin, validateReview, wrapAsync(allReviewCnt.createReview));

// delete review
router.delete("/:r_id", isAuthor, wrapAsync(allReviewCnt.deteleReview));

module.exports = router;
