const Hall = require('../models/Hall');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicates
  }
});

// Initialize upload variable with multer
const upload = multer({ storage: storage }).fields([
  { name: 'mainImage', maxCount: 1 }, // For the main image
  { name: 'images', maxCount: 10 }     // For additional images
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
      console.error("Upload error:", err); // Log the error for debugging
      return res.status(400).json({ message: "Error uploading file", error: err.message });
    }

    // Extract fields from the request body and files
    const { name, location, capacity, price, services, area, layout } = req.body;
    const filenames = req.files.images ? req.files.images.map(file => file.filename) : []; // Ensure filenames are retrieved from images array
    const mainImageFile = req.files.mainImage ? req.files.mainImage[0].filename : null; // Get the main image filename

    // Check if all required fields are provided
    if (!name || !location || !capacity || !price || !services || !area || !layout || !mainImageFile) {
      return res.status(400).json({ message: "Please provide all required fields, including main image" });
    }

    // Ensure mainImageFile is one of the uploaded filenames
    if (!filenames.includes(mainImageFile)) {
      return res.status(400).json({ message: "Main image must be one of the uploaded images" });
    }

    // Validate the layout value
    const validLayouts = ['U-shape', 'Circular', 'Matrix'];
    if (!validLayouts.includes(layout)) {
      return res.status(400).json({ message: "Invalid layout option" });
    }

    const newHall = new Hall({
      name,
      location,
      capacity,
      price,
      services: services.split(','), // Assuming services are sent as a comma-separated string
      area,
      layout,
      images: [...filenames, mainImageFile], // Include main image in images array
      mainImage: mainImageFile // Store the main image filename
    });

    try {
      const savedHall = await newHall.save();
      res.status(201).json(savedHall);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};
module.exports = { getHalls, getHallById, createHall };
