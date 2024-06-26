const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressTitle: {
    type: String,
    required: [true, 'Address must have a title.']
  },
  address: {
    type: String,
    required: [true, 'Address cant be blank.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Address must belong to a User.']
  }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;