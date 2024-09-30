const Service = require('../models/Service');

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  const { name, price } = req.body;
  const newService = new Service({ name, price });
  
  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getServices, createService };
