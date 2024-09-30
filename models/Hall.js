const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true }, // Base price for hall
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], 
  area: { type: Number, required: true },
  mainImage: { type: String, required: true },
  images: [{ type: String, required: true }] ,
  layout: {
    type: String,
    enum: ['U-shape', 'Circular', 'Matrix'], // Allowed layout options
    required: true
  }
});



const Hall = mongoose.model('Hall', hallSchema);
module.exports = Hall;
