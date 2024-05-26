const mongoose = require('mongoose');

const propertyImageSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  images: [{
    type: Buffer,
    required: true
  }]
});

const PropertyImage = mongoose.model('PropertyImage', propertyImageSchema);

module.exports = PropertyImage;
