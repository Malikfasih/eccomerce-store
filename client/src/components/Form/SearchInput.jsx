import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../../api/index";

const SearchInput = () => {
  const [searchValues, setSearchValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await searchProduct(searchValues.keyword);
      setSearchValues({ ...searchValues, results: data });
      //   console.log("search products -->", data);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchValues.keyword}
          onChange={(e) =>
            setSearchValues({ ...searchValues, keyword: e.target.value })
          }
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
