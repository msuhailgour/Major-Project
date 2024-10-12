const Listing = require("../models/listing");
const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });

module.exports.testRoute = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing/index.ejs", { allListings });
};

//search
module.exports.testRoute2 = async (req, res) => {
  const city = req.query.countryn;
  const allListings = await Listing.find({});

  res.render("listing/search.ejs", { allListings, city });
};

module.exports.newRouter = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.newRouter2 = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({ path: "reviews", populate: { path: "author" } });

  if (!listing) {
    req.flash("error", "Listing You Requested does not Found");
    res.redirect("/listings");
  }

  res.render("listing/show.ejs", { listing });
};

module.exports.addNewListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 2,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;

  let newl = new Listing(req.body.listing);
  newl.geometry = response.body.features[0].geometry;

  newl.owner = req.user._id;
  newl.image = { url, filename };
  await newl.save();

  req.flash("success", "New Listing Crated");
  res.redirect("/listings");
};

module.exports.editListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const original = listing.image.url;
  console.log(original);
  let original1 = original.replace("/upload", "/upload/h_250,w_200");
  console.log(original1);
  res.render("listing/edit.ejs", { listing, original1 });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updeted");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
