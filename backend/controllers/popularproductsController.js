import { v2 as cloudinary } from "cloudinary";
import popularproductsModel from "../models/popularproductsModel.js";

// ADD Popular Product
export const addPopularProduct = async (req, res) => {
  try {
    const { name, category } = req.body;
    const media = req.file;

    if (!media) {
      return res.json({ success: false, message: "Media file required" });
    }

    if (!category) {
      return res.json({ success: false, message: "Category is required" });
    }

    const upload = await cloudinary.uploader.upload(media.path, {
      resource_type: "auto",
    });

    const popularProductData = {
      name,
      category,
      image: [upload.secure_url],
      date: Date.now(),
    };

    const newPopularProduct = new popularproductsModel(popularProductData);
    await newPopularProduct.save();

    res.json({ success: true, message: "Popular product added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// REMOVE Popular Product
export const removePopularProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await popularproductsModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Popular product removed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// GET SINGLE PRODUCT
export const singlePopularProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const item = await popularproductsModel.findById(id);

    res.json({ success: true, popularProduct: item });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// LIST ALL
export const listPopularProducts = async (req, res) => {
  try {
    const items = await popularproductsModel.find().sort({ createdAt: -1 });

    res.json({ success: true, popularProducts: items });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
