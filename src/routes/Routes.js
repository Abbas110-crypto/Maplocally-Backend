const express = require('express');
const router = express.Router();
const { authLogin, createProduct, GetAllProduct, GetSingleProduct, UpdatedProduct, DeleteProduct, GetTestimonial, GetProductFilter} = require('../controllers/authController');

router.post('/login', authLogin);
router.post('/create-product', createProduct);          // Create product
router.get('/get-products', GetAllProduct);            // Get all products
router.get('/get-testimonial', GetTestimonial);         // Get all testimonials
router.get('/get-product/:id', GetSingleProduct);  // Correct route definition for getting a product by ID
router.put('/update-product/:id', UpdatedProduct);       // Update product by ID
router.delete('/delete-product/:id', DeleteProduct);    // Delete product by ID
router.get('/product-filter', GetProductFilter)       

module.exports = router;
