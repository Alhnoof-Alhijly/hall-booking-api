const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Connect to MongoDB
connectDB();



// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/halls', require('./routes/hallRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Export the app for Vercel

module.exports = app;
