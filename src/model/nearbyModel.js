const mongoose = require('mongoose');

const nearbySchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  amenityType: {
    type: String,
    enum: ['hospital', 'college', 'mall', 'school'],
    required: true
  },
  amenityName: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
});

const Nearby = mongoose.model('Nearby', nearbySchema);

module.exports = Nearby;
