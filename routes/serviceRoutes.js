const express = require('express');
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService,
  getServiceById
} = require('../controllers/serviceController');

router.get('/', getServices);
router.post('/', createService);
router.get('/:id', getServiceById);
router.put('/:id', updateService); // Update service
router.delete('/:id', deleteService); // Delete service

module.exports = router;
