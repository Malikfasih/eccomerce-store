import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";
import { productPhoto, similarProducts, singleProduct } from "../api/index";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital details
  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  //get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await singleProduct(params.slug);
      setProduct(data?.product);
      getRelatedProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get related products
  const getRelatedProducts = async (productId, categoryId) => {
    try {
      const { data } = await similarProducts(productId, categoryId);
      // const photo = await productPhoto(productId);

      // console.log("photo", photo);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((product) => (
            <div className="card m-2" key={product._id}>
              <img
                src={`/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title card-price">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {product.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
