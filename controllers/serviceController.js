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
const getServiceById = async (req, res) => {
  try {
      const service = await Service.findById(req.params.id);
      if (!service) {
          return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
// Update a service
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getServices, createService, updateService, deleteService ,getServiceById };
