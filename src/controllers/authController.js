const { login, register } = require('../services/userService');
const jwt = require('jsonwebtoken');
const {Products, Testimonials, Articles, Featured, Contact}  = require('../models/userSchema');
require('dotenv').config();

const ADMIN_USERNAME = 'admin@maplocally.com';
const ADMIN_PASSWORD = 'admin123@';

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const Token = jwt.sign({ email }, 'JWT_SECRET');
      return res.status(200).json({ Token, message: 'Login successful' });
  }

  res.status(401).json({ message: 'Invalid username or password' });
};

const createProduct = async (req, res) => {
    try {
      const { title, subTitle, price, briefDescription, fullDescription, category, tags, productImages, highlights, includes, tourDuration, tourLanguage, pickupOption, groupSize, meetingPoint, latitude, longitude, tourDate, people, date } = req.body;
        console.log('Product model:', title);
        const existingProduct = await Products.findOne({ title: title });
      if (existingProduct) {
        return res.status(400).json({ success: false, message: 'Product already exists' });
      }
  
      // Create a new product
      const product = new Products({ title, subTitle, price, briefDescription, fullDescription, category,tags, productImages, highlights, includes, tourDuration, tourLanguage, pickupOption, groupSize, meetingPoint, latitude, longitude, tourDate, people,date});
      product.save();
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      console.error('Error in create Product:', error);
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
  const { id } = req.params;  
  console.log(id);
  try {
      const product = await Products.findById(id); 
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
  
      const updatedProduct = await Products.findByIdAndUpdate( id, req.body);
      console.log( id );
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


  const createFeaturedProduct = async (req, res) => {
    try {
      const { title, price, shortDescription, category,productImages,people,date } = req.body;
        console.log('Product model:', title);
        const existingProduct = await Featured.findOne({ title: title });
      if (existingProduct) {
        return res.status(400).json({ success: false, message: 'Product already exists' });
      }
  
      // Create a new product
      const product = new Featured({ title, price, shortDescription, category,productImages,people,date});
      product.save();
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

const GetAllFeaturedProduct = async (req, res) => {
    try {
      const products = await Featured.find(); // Fetch all products
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const GetSingleFeaturedProduct =  async (req, res) => {
  const { id } = req.params;  
  console.log(id);
  try {
      const product = await Featured.findById(id); 
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const UpdatedFeaturedProduct =  async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedProduct = await Featured.findByIdAndUpdate( id, req.body);
      console.log( id );
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

const DeleteFeaturedProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Featured.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const ProductTagFilter = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the product by ID
      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Validate `tags` field
      if (!product.tags || !Array.isArray(product.tags) || product.tags.length === 0) {
        return res.status(404).json({ message: "No tags found for this product" });
      }
  
      // Query for related products
      const relatedProducts = await Products.find({
        _id: { $ne: id }, // Exclude the current product
        tags: { $in: product.tags }, // Match products with overlapping tags
      });
  
      if (relatedProducts.length === 0) {
        return res.status(404).json({ message: "No related products found" });
      }
  
      res.json({ relatedProducts });
    } catch (error) {
      console.error("Error in ProductTagFilter:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  const RelatedProductsFilter = async (req, res) => {
    const { productId, category } = req.query;
  
    try {
      // Validate required fields
      if (!productId || !category) {
        return res.status(400).json({ success: false, message: "Product ID and category are required" });
      }
  
      // Find related products by category, excluding the current product
      const relatedProducts = await Products.find({
        category: category,
        _id: { $ne: productId }, // Exclude the selected product by ID
      }).exec();
  
      res.status(200).json({
        success: true,
        data: relatedProducts,
      });
    } catch (error) {
      console.error("Error fetching related products:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  const GetProductFilter = async (req, res) => {
    try {
      const { category, minPrice, maxPrice, people, date } = req.query;
  
      // Initialize filter criteria
      let filterCriteria = {};
      
      // Filter by category if provided
      if (category) {
        filterCriteria.category = category;
      }
  
      // Filter by price if provided (exact match)
      if (minPrice || maxPrice) {
        filterCriteria.price = {};
        if (minPrice) filterCriteria.price.$gte = parseFloat(minPrice);  // minPrice (greater than or equal)
        if (maxPrice) filterCriteria.price.$lte = parseFloat(maxPrice);  // maxPrice (less than or equal)
      }
  
  
      // Filter by people if provided (exact match)
      if (people) {
        filterCriteria.people = parseInt(people, 10);  // Ensures people is an integer
      }
  
      // Filter by date if provided (exact match for createdAt)
      if (date) {
        filterCriteria.date = date;
      }
  
      // Fetch products based on the filter criteria
      const products = await Products.find(filterCriteria).exec();
  
      // Return the filtered products
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const ContactUserResponse =async (req, res) => {
    try {
      const { name, email, company, subject, message } = req.body;
  
      const newContact = new Contact({
        name,
        email,
        company,
        subject,
        message,
      });
  
      await newContact.save();
  
      res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
      console.error('Error saving contact form:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };

  const GetTestimonial = async (req, res) => {
    try {
      const Testimonial = await Testimonials.find(); // Fetch all products
      res.status(200).json({ success: true, data: Testimonial });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const createArticle= async (req, res) => {
    try {
      const article = new Articles(req.body);
      await article.save();
      res.status(201).json({ message: "Article created successfully!", data: article });
    } catch (err) {
      res.status(500).json({ message: "Error creating article.", error: err });
    }
  };

const GetAllArticle= async (req, res) => {
  try {
    const articles = await Articles.find();
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const GetSingleArticle= async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Articles.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const UpdateArticle= async (req, res) => {
  try {
    const updatedArticle = await Articles.findByIdAndUpdate(
      req.params.id,
      req.body    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found." });
    }
    res.status(200).json({ message: "Article updated successfully!", data: updatedArticle });
  } catch (err) {
    res.status(500).json({ message: "Error updating article.", error: err });
  }
};

const DeleteArticle= async (req, res) => {
  const { id } = req.params;
  try {
    const articleId = id;

    // Find and delete the article
    const deletedArticle = await Articles.findByIdAndDelete(articleId);

    if (!deletedArticle) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { authLogin, createProduct, GetAllProduct, GetSingleProduct, UpdatedProduct, DeleteProduct, ProductTagFilter, RelatedProductsFilter, createFeaturedProduct, GetAllFeaturedProduct, GetSingleFeaturedProduct, UpdatedFeaturedProduct, DeleteFeaturedProduct, GetTestimonial, GetProductFilter,createArticle, GetAllArticle, GetSingleArticle, UpdateArticle, DeleteArticle, ContactUserResponse};
