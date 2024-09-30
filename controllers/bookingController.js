const Booking = require('../models/Booking');

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  const { hallName, price, date, time } = req.body;
  const newBooking = new Booking({ hallName, price, date, time });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getBookings, createBooking };
