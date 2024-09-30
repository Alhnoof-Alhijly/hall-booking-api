const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  bookingTime: {
    type: String,  // You can store time as a string (e.g., '14:00' for 2:00 PM)
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
