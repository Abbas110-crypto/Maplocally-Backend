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
      people: {
        type: Number,
      },
      date: {
        type: String,
      },
    }
  );
  
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    review: {
      type: Number,
    },
  }
);
const Products = mongoose.model('Product', productSchema);

  const Testimonials = mongoose.model('Testimonial', testimonialSchema);
  
  module.exports = {Products,Testimonials};