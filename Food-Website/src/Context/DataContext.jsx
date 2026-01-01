import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const url = `http://localhost:4000`
  const [token, setToken] =useState("")


  // fething all data from API

  const featchProducts = async () => {
    try {
      const url = await axios.get(`https://dummyjson.com/recipes`);
      
      
      const productsData = url.data.recipes
      console.log(productsData);
      
      setData(productsData);

      
    } catch (error) {
      console.log(error);
    }
  };


   const getCategory = (data, property) => {
      let newVal = data?.map((elem) => {
        return elem[property];
      });
      newVal = ["All",...new Set(newVal)];
      return newVal;
    };
    const CategoryOnlyData = getCategory(data, "cuisine");
  
    
    const brandOnlyData =  getCategory(data, "mealType")

  useEffect(() => {
    featchProducts();
  },[]);

  return (
    <DataContext.Provider value={{ featchProducts, data, setData,CategoryOnlyData, brandOnlyData, url, token , setToken  }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
