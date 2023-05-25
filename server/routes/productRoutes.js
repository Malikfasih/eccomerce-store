import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  productCategory,
  productCount,
  productFilters,
  productList,
  productPhoto,
  relatedProducts,
  searchProduct,
  braintreeToken,
  brainTreePayment,
} from "../controllers/product.js";
import { isAdmin, requireSignIn } from "../middleware/auth.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

// createProduct
router.post(
  "/create-product",
  requireSignIn,
  // isAdmin,
  formidable(),
  createProduct
);

// update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

//get All products
router.get("/get-products", getAllProducts);

//single product
router.get("/get-product/:slug", getSingleProduct);

//get photo
router.get("/product-photo/:id", productPhoto);

//delete product
router.delete("/delete-product/:id", deleteProduct);

//filter product
router.post("/product-filters", productFilters);

//product count
router.get("/product-count", productCount);

//product per page
router.get("/product-list/:page", productList);

//search product
router.get("/search/:keyword", searchProduct);

//similar products
router.get("/related-product/:pid/:cid", relatedProducts);

//category wise product
router.get("/product-category/:slug", productCategory);

//payments routes
//token
router.get("/braintree/token", braintreeToken);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePayment);

export default router;
