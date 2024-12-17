const { login, register } = require('../services/userService');
const jwt = require('jsonwebtoken');
const {Products, Testimonials, Articles, Featured}  = require('../models/userSchema');
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
      const { title, price, shortDescription, category,tags, productImages,people,date } = req.body;
        console.log('Product model:', title);
        const existingProduct = await Products.findOne({ title: title });
      if (existingProduct) {
        return res.status(400).json({ success: false, message: 'Product already exists' });
      }
  
      // Create a new product
      const product = new Products({ title, price, shortDescription, category,tags, productImages,people,date});
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
  
      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const relatedProducts = await Products.find(
        {
          _id: { $ne: id }, 
          tags: { $in: product.tags },
        }      );
  
      if (relatedProducts.length === 0) {
        return res.status(404).json({ message: "No related products found" });
      }
  
      res.json({ relatedProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
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
      const {
        title,
        shortDescription,
        fullDescription,
        eventDate,
        viewers,
        userImage,
        productImage,
        selectedPlaces,
        articleDetails,
      } = req.body;
  
      // Validate if the necessary data is present
      if (!title || !shortDescription || !fullDescription || !eventDate || !viewers || !userImage || !productImage || !selectedPlaces || !articleDetails) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Create a new article
      const newArticle = new Articles({
        title,
        shortDescription,
        fullDescription,
        eventDate,
        viewers,
        userImage,
        productImage,
        selectedPlaces,
        articleDetails,
      });
  
      // Save the article to the database
      await newArticle.save();
  
      return res.status(201).json({ success: true, message: 'Article created successfully', article: newArticle });
    } catch (error) {
      console.error("Error creating article:", error);
      return res.status(500).json({ success: false, message: error.message });
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
  const { id } = req.params;
  try {
    const articleId = id;
    const { title, shortDescription, fullDescription, eventDate, viewers, userImage, productImage, articleDetails } = req.body;

    // Find and update the article
    const updatedArticle = await Articles.findByIdAndUpdate(
      articleId,
      {
        title,
        shortDescription,
        fullDescription,
        eventDate,
        viewers,
        userImage,
        productImage,
        articleDetails
      },
      { new: true } // Return the updated article
    );

    if (!updatedArticle) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({ success: true, data: updatedArticle });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ success: false, message: error.message });
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

module.exports = { authLogin, createProduct, GetAllProduct, GetSingleProduct, UpdatedProduct, DeleteProduct, ProductTagFilter, createFeaturedProduct, GetAllFeaturedProduct, GetSingleFeaturedProduct, UpdatedFeaturedProduct, DeleteFeaturedProduct, GetTestimonial, GetProductFilter,createArticle, GetAllArticle, GetSingleArticle, UpdateArticle, DeleteArticle};
