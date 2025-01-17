const express = require('express');
const router = express.Router();
const { authLogin, createProduct, GetAllProduct, GetSingleProduct, UpdatedProduct, DeleteProduct , ProductTagFilter, ContactUserResponse, createFeaturedProduct, GetAllFeaturedProduct, GetSingleFeaturedProduct, UpdatedFeaturedProduct, DeleteFeaturedProduct, GetTestimonial, GetProductFilter, createArticle, GetAllArticle, GetSingleArticle, UpdateArticle, DeleteArticle} = require('../controllers/authController');

router.post('/login', authLogin);
router.post('/create-product', createProduct);          // Create product
router.get('/get-products', GetAllProduct);            // Get all products
router.get('/get-testimonial', GetTestimonial);         // Get all testimonials
router.get('/get-product/:id', GetSingleProduct);  // Correct route definition for getting a product by ID
router.put('/update-product/:id', UpdatedProduct);       // Update product by ID
router.delete('/delete-product/:id', DeleteProduct);    // Delete product by ID
router.post('/contact', ContactUserResponse);
router.post('/create-featured-product', createFeaturedProduct);          // Create Featured product
router.get('/get-featured-products', GetAllFeaturedProduct);            // Get all featured products
router.get('/get-featured-product/:id', GetSingleFeaturedProduct);  // Correct route definition for getting a product by ID
router.put('/update-featured-product/:id', UpdatedFeaturedProduct);       // Update featured product by ID
router.delete('/delete-featured-product/:id', DeleteFeaturedProduct);    // Delete featured product by ID
router.get('/product-tag-filter/:id', ProductTagFilter)  // Product Filter By Tag
router.get('/product-filter', GetProductFilter);         // Product Filter
router.post('/create-article', createArticle);          // Create Article     
router.get('/get-articles', GetAllArticle);            // Get all Article
router.get('/get-article/:id', GetSingleArticle);  // Correct route definition for getting a Article by ID
router.put('/update-article/:id', UpdateArticle);       // Update Article by ID
router.delete('/delete-article/:id', DeleteArticle);    // Delete Article by ID

module.exports = router;
