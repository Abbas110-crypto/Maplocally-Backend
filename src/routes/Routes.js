const express = require('express');
const router = express.Router();
const { authLogin, createProduct, GetAllProduct, GetSingleProduct, UpdatedProduct, DeleteProduct} = require('../controllers/authController');
// Routes
router.post('/login', authLogin);
router.post('/hello', createProduct);          // Create product
router.get('/', GetAllProduct);            // Get all products
router.get('/:id', GetSingleProduct);          // Get single product by ID
router.put('/:id', UpdatedProduct);       // Update product by ID
router.delete('/:id', DeleteProduct);    // Delete product by ID
       

module.exports = router;
