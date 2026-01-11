import mongoose from "mongoose";

const OfferProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    media: {
      url: String,
      type: { type: String, enum: ["image", "video"], default: "image" },
    },

    originalPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    days: { type: Number },

    category: { type: String, required: true }, // <-- added required
  },
  { timestamps: true }
);

export default mongoose.model("OfferProduct", OfferProductSchema);
