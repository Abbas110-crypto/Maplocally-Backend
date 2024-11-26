const { login, register } = require('../services/userService');
const jwt = require('jsonwebtoken');
const Products  = require('../models/userSchema');
require('dotenv').config();

const ADMIN_USERNAME = 'admin@maplocally.com';
const ADMIN_PASSWORD = 'admin123@';

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the username and password are correct
  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const Token = jwt.sign({ email }, 'JWT_SECRET');
      return res.status(200).json({ Token, message: 'Login successful' });
  }

  res.status(401).json({ message: 'Invalid username or password' });
};

const createProduct = async (req, res) => {
    try {
      const { title, price, shortDescription, category,productImages } = req.body;
  
      // Debugging: Check if the Product model is loaded
      console.log('Product model:', title);
  
      // Check if product exists
      const existingProduct = await Products.findOne({ title: title });
      if (existingProduct) {
        return res.status(400).json({ success: false, message: 'Product already exists' });
      }
  
      // Create a new product
      const product = new Products({ title, price, shortDescription, category,productImages});
      product.save();
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

const GetAllProduct = async (req, res) => {
    try {
      const products = await Products.find(); // Fetch all products
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const GetSingleProduct =  async (req, res) => {
    try {
      const product = await Products.findById(req.params.id); 
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const UpdatedProduct =  async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedProduct = await Products.findByIdAndUpdate(id, req.body);
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const DeleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Products.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



module.exports = { authLogin, createProduct, GetAllProduct, GetSingleProduct, UpdatedProduct, DeleteProduct};
