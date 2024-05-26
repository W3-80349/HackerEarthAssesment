const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  houseNo: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  area: {
    type: String,
  },
  landmark: {
    type: String
  },
  pincode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  numberOfBedrooms: {
    type: Number,
    required: true
  },
  numberOfBathrooms: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  numberOfLikes: {
    type: Number,
    default: 0
  },
  isSoldOut: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true 
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
