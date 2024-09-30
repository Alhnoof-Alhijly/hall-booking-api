const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Hall = require('../models/Hall');

// Create a new booking
router.post('/', async (req, res) => {
  const { hallId, customerName, bookingDate, bookingTime } = req.body;

  try {
    // Find the hall
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    // Calculate total price based on the hall price
    const totalPrice = hall.price;

    // Create a new booking
    const booking = new Booking({
      hall: hallId,
      customerName,
      bookingDate,
      bookingTime,
      totalPrice
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all bookings
router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find().populate('hall');  // Populate hall details
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get bookings for a specific hall
  router.get('/hall/:hallId', async (req, res) => {
    const { hallId } = req.params;
    
    try {
      const bookings = await Booking.find({ hall: hallId }).populate('hall');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
