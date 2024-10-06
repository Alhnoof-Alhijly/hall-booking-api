const express = require('express');
const router = express.Router();
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

router.get('/', getBookings);
router.post('/', createBooking);
router.put('/:id', updateBooking); // Update booking
router.delete('/:id', deleteBooking); // Delete booking

module.exports = router;