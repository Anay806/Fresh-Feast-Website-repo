import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([])
  const [data, setData] = useState([]);
  const url = `http://localhost:4000`
  const [token, setToken] =useState("")


  // fething all data from API

  const featchProducts = async () => {
    try {
      const url = await axios.get(`http://localhost:4000/allproducts`);
      console.log(url);
      
      
      
      const productsData = url.data
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
    const CategoryOnlyData = getCategory(data, "category");
  
    
    const brandOnlyData =  ["All", "true", "false"]

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
