const express = require('express');
const router = express.Router();
const {
  getHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall
} = require('../controllers/hallController');

router.get('/', getHalls);
router.get('/:id', getHallById);
router.post('/', createHall);
router.put('/:id', updateHall); // Update hall
router.delete('/:id', deleteHall); // Delete hall

module.exports = router;
