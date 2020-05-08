// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const BusSchema = new Schema(
  {
    id: Number,
    from: String,
    to: String,
    date: String,
    bookedSeats : String,
    availableSeats : Number
  },{collection: 'bus'}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Bus", BusSchema);