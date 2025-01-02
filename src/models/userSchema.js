const mongoose = require('mongoose');

//
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
    briefDescription: {
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
    groupSize: {
      type: String, 
    },
    tourDate: {
      type: String, // Storing date as a string in YYYY-MM-DD format
    },
    tourDuration: {
      type: String, // Duration stored as a string for flexible descriptions
    },
    tourLanguage: {
      type: String, // Language of the tour
    },
    pickupOption: {
      type: String, // Details about pickup options
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const featuredSchema = new mongoose.Schema(
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
    briefDescription: {
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
    groupSize: {
      type: String, 
    },
    tourDate: {
      type: String, // Storing date as a string in YYYY-MM-DD format
    },
    tourDuration: {
      type: String, // Duration stored as a string for flexible descriptions
    },
    tourLanguage: {
      type: String, // Language of the tour
    },
    pickupOption: {
      type: String, // Details about pickup options
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
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

// Create a Mongoose schema and model for the contact form
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  userName: { type: String, required: true },
  date: { type: Date, required: true },
  views: { type: String, required: true },
  userImage: { type: String },
  articleImage: { type: String },
  places: [
    {
      title: { type: String },
      shortDescription: { type: String },
      image: { type: String },
      number: { type: String },
      website: { type: String },
      address: { type: String },
    },
  ],
});

const Articles = mongoose.model('Article', articleSchema);
const Products = mongoose.model('Product', productSchema);
const Featured = mongoose.model('Featured', featuredSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Testimonials = mongoose.model('Testimonial', testimonialSchema);
  
  module.exports = {Products,Testimonials,Articles, Featured,Contact};