import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Helper: get Cloudinary resource type from mimetype
const getResourceType = (mimetype) => {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("video/")) return "video";
  if (mimetype.startsWith("audio/")) return "raw"; // audio files use raw in Cloudinary
  return "auto";
};

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      bestseller,
      rating,
      customers,
    } = req.body;

    // Your multer field names expected: media1, media2, media3, media4
    const mediaFiles = [
      req.files.media1?.[0],
      req.files.media2?.[0],
      req.files.media3?.[0],
      req.files.media4?.[0],
    ].filter(Boolean);

    // Upload all media files with proper resource_type
    const media = await Promise.all(
      mediaFiles.map(async (file) => {
        const resourceType = getResourceType(file.mimetype);
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: resourceType,
        });
        return {
          url: result.secure_url,
          type: resourceType === "raw" ? "audio" : resourceType,
          public_id: result.public_id,
        };
      })
    );

    // Extract reviews from req.body like before
    const reviews = [];
    for (let i = 0; i < 50; i++) {
      const reviewer = req.body[`reviews[${i}][reviewer]`];
      const comment = req.body[`reviews[${i}][comment]`];
      const revRating = req.body[`reviews[${i}][rating]`];

      if (reviewer && comment && revRating !== undefined) {
        reviews.push({
          reviewer,
          comment,
          rating: Number(revRating),
        });
      } else {
        break;
      }
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestseller: bestseller === "true" || bestseller === true,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes || [],
      media, // changed from `image` to `media` to reflect mixed media
      rating: Number(rating),
      customers: Number(customers),
      reviews,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update reviews
const updateProductReviews = async (req, res) => {
  try {
    const { reviews } = req.body;
    const { id } = req.params;

    if (!Array.isArray(reviews)) {
      return res.status(400).json({ success: false, message: "Invalid reviews format" });
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { reviews },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Reviews updated", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProductReviews,
};
