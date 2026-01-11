import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProductReviews,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// ❌ Admin auth removed – public routes
productRouter.post(
  "/add",
  upload.fields([
    { name: "media1", maxCount: 1 },
    { name: "media2", maxCount: 1 },
    { name: "media3", maxCount: 1 },
    { name: "media4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.put("/update-reviews/:id", updateProductReviews);

export default productRouter;
