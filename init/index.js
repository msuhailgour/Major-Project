const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dbUrl = process.env.MONGO_ATLAS_DB;

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("Hello", err));
async function main() {
  await mongoose.connect(dbUrl);
}

const intDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66fd8290cb5625c4bc9181e7",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

intDb();
