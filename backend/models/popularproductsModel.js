import mongoose from "mongoose";

const popularProductsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    image: { type: [String], required: true },
      category: { type: String, required: true },
    date: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("popularproducts", popularProductsSchema);
