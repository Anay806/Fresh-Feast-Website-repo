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
      if (!Array.isArray(data)) return ['All']
      const newVal = [ 'All', ...new Set(data.map((item) =>item[property]))]
      return newVal;
    };
    const CategoryOnlyData = getCategory(data, "category");
  
    
    const brandOnlyData =  ["All", "true", "false"]

  useEffect(() => {
    featchProducts();

    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/getcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token' : `${localStorage.getItem('auth-token')}`,
          'Content-Type' :'application/json',
        },
        body:"",
      }).then((response) =>response.json()).then((data) =>setData(data));
    }
  },[]);

  return (
    <DataContext.Provider value={{ featchProducts, data, setData,CategoryOnlyData, brandOnlyData, url, token , setToken  }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
