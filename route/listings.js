const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLogin, isOwner } = require("../views/middleware.js");
const allListingController = require("../controllers/listingsc.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//err handle middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

//test Route
router.get("/", wrapAsync(allListingController.testRoute));

//search

router.get("/search", wrapAsync(allListingController.testRoute2));

//new route
router.get("/new", isLogin, allListingController.newRouter);

router.get("/:id", isLogin, wrapAsync(allListingController.newRouter2));

//add new listing
router.post(
  "/",
  isLogin,

  upload.single("listing[image]"),
  wrapAsync(allListingController.addNewListing)
);

//eidt route
router.get(
  "/:id/edit",
  isLogin,
  isOwner,
  wrapAsync(allListingController.editListings)
);

//update Route
router.put(
  "/:id",
  isLogin,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(allListingController.updateListing)
);

//delete route
router.delete(
  "/:id/delete",
  isLogin,
  isOwner,
  wrapAsync(allListingController.deleteListing)
);

module.exports = router;
