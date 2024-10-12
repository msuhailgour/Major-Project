const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  // console.log("saved");
  res.redirect(`/listings/${id}`);
};

module.exports.deteleReview = async (req, res) => {
  let { id, r_id } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: r_id } });
  await Review.findByIdAndDelete(r_id);

  res.redirect(`/listings/${id}`);
};
