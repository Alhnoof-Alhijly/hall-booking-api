
const multer = require('multer'); // Import multer
const path = require('path');
const Hall = require('../models/Hall');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage }).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]);
  
  // Get all halls with services
  const getHalls = async (req, res) => {
    try {
      const halls = await Hall.find().populate('services');
      res.json(halls);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const getHallById = async (req, res) => {
    try {
      const hall = await Hall.findById(req.params.id).populate('services');
      if (!hall) {
        return res.status(404).json({ message: "Hall not found" });
      }
      res.json(hall);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Create a new hall
  const createHall = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file", error: err.message });
      }
  
      const { name, location, capacity, price, services, area, layout } = req.body;
      const filenames = req.files.images ? req.files.images.map(file => file.filename) : [];
      const mainImageFile = req.files.mainImage ? req.files.mainImage[0].filename : null;
  
      if (!name || !location || !capacity || !price || !services || !area || !layout || !mainImageFile) {
        return res.status(400).json({ message: "Please provide all required fields, including main image" });
      }
  
      if (!filenames.includes(mainImageFile)) {
        return res.status(400).json({ message: "Main image must be one of the uploaded images" });
      }
  
      const validLayouts = ['U-shape', 'Circular', 'Matrix'];
      if (!validLayouts.includes(layout)) {
        return res.status(400).json({ message: "Invalid layout option" });
      }
  
      const newHall = new Hall({
        name,
        location,
        capacity,
        price,
        services: services.split(','),
        area,
        layout,
        images: [...filenames, mainImageFile],
        mainImage: mainImageFile
      });
  
      try {
        const savedHall = await newHall.save();
        res.status(201).json(savedHall);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  };
  
  // Update a hall
  const updateHall = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file", error: err.message });
      }
  
      const { name, location, capacity, price, services, area, layout } = req.body;
      const filenames = req.files.images ? req.files.images.map(file => file.filename) : [];
      const mainImageFile = req.files.mainImage ? req.files.mainImage[0].filename : null;
  
      if (!name || !location || !capacity || !price || !services || !area || !layout || !mainImageFile) {
        return res.status(400).json({ message: "Please provide all required fields, including main image" });
      }
  
      const validLayouts = ['U-shape', 'Circular', 'Matrix'];
      if (!validLayouts.includes(layout)) {
        return res.status(400).json({ message: "Invalid layout option" });
      }
  
      try {
        const updatedHall = await Hall.findByIdAndUpdate(
          req.params.id,
          {
            name,
            location,
            capacity,
            price,
            services: services.split(','),
            area,
            layout,
            images: [...filenames, mainImageFile],
            mainImage: mainImageFile
          },
          { new: true }
        );
  
        if (!updatedHall) {
          return res.status(404).json({ message: "Hall not found" });
        }
        res.json(updatedHall);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  };
  
  // Delete a hall
  const deleteHall = async (req, res) => {
    try {
      const deletedHall = await Hall.findByIdAndDelete(req.params.id);
      if (!deletedHall) {
        return res.status(404).json({ message: "Hall not found" });
      }
      res.json({ message: "Hall deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { getHalls, getHallById, createHall, updateHall, deleteHall };