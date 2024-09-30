const express = require('express');
const { getHalls, createHall,getHallById } = require('../controllers/hallController');
const router = express.Router();

router.get('/', getHalls);
router.post('/', createHall);
router.get('/:id', getHallById); 

module.exports = router;
