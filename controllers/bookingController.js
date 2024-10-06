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
    const { hall, customerName, customerEmail, customerPhone, bookingDate, bookingTime, service } = req.body;
    
    // Ensure the names match with what you send in the request
    const newBooking = new Booking({ 
        hall, 
        customerName, 
        customerEmail, 
        customerPhone, 
        bookingDate, 
        bookingTime, 
        service 
    });
  
    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
  
  // Update a booking
  const updateBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(updatedBooking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete a booking
  const deleteBooking = async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json({ message: "Booking deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { getBookings, createBooking, updateBooking, deleteBooking };