import { useState, useEffect } from "react";
import { getAllCategories } from "../api/index";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get all categories
  const getCategories = async () => {
    try {
      const { data } = await getAllCategories();
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
