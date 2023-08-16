import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).token
    }`;
  }

  return req;
});

// authentication
export const register = (formData) => API.post("/user/register", formData);
export const login = (formData) => API.post("/user/login", formData);
export const forgotPassword = (formData) =>
  API.post("/user/forgot-password", formData);
export const updateProfile = (userData) => API.put("/user/profile/", userData);

// category
export const createCategory = (name) =>
  API.post("/category/create-category", name);
export const getAllCategories = () => API.get("/category/get-categories");
export const updateCategory = (id, name) =>
  API.put(`/category/update-category/${id}`, name);
export const deleteCategory = (id) =>
  API.delete(`/category/delete-category/${id}`);
export const getSingleCategory = () =>
  API.get(`/category/single-category/:slug`);

// product
export const allProducts = () => API.get("/product/get-products");
export const singleProduct = (slug) => API.get(`/product/get-product/${slug}`);
export const createProduct = (productData) =>
  API.post("/product/create-product", productData);
export const updateProduct = (id, productData) =>
  API.put(`/product/update-product/${id}`, productData);
export const deleteProduct = (id) =>
  API.delete(`/product/delete-product/${id}`);
export const totalProducts = () => API.get("/product/product-count");
export const filteredProducts = (values) =>
  API.post("/product/product-filters", values);
export const listOfProducts = (page) =>
  API.get(`/product/product-list/${page}`);
export const searchProduct = (keyword) => API.get(`/product/search/${keyword}`);
export const similarProducts = (productId, categoryId) =>
  API.get(`/product/related-product/${productId}/${categoryId}`);
export const productsByCategory = (slug) =>
  API.get(`/product/product-category/${slug}`);
export const productPhoto = (id) => API.get(`/product/product-photo/${id}`);
export const paymentToken = () => API.get("/product/braintree/token");
export const productPayment = (data) =>
  API.post("/product/braintree/payment", data);

// Private routes
export const userRoute = () => API.get("/user/user-auth");
export const adminRoute = () => API.get("/user/admin-auth");
export const allUsers = () => API.get("/user/get-users");

// order routes
export const userOrders = () => API.get("/order/orders");
export const allOrders = () => API.get("/order/all-orders");
export const changedStatus = (orderId, status) =>
  API.put(`/order/order-status/${orderId}`, status);
