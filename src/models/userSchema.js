const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      tags: {
        type: [String], 
      },
      shortDescription: {
        type: String,
      },
      fullDescription: {
        type: String,
      },
      productImages: {
        type: [String], 
      },
      highlights: {
        type: [String], 
        default: [],
      },
      includes: {
        type: [String], 
        default: [],
      },
      meetingPoint: {
        type: String,
      },
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
      category: {
        type: String,
      },
    }
  );
  const Products = mongoose.model('Product', productSchema);
  
  module.exports = Products;