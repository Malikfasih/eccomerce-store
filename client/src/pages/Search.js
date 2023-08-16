import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [searchValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {searchValues?.results.length < 1
              ? "No Products Found"
              : `Found ${searchValues?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {searchValues?.results.map((product) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {product.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
