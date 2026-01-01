import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const [searchData, setSerachData] = useState([])
  const params = useParams()
  const category = params.cuisine
  console.log(category);

  const getFilterData = async() =>{
    try {
      const res = await axios.get(`https://dummyjson.com/recipes?sortBy=${category}`)
      const data = res.data.cuisine
      console.log(data);
      
      setSerachData(data)
      
      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  useEffect(() =>{
    getFilterData()
  },[])
  
  return (
    <div>
     {
      searchData?.length > 0 ? <div>Data Hai</div> : <div>Data nhi hai</div>
     }
    </div>
  )
}

export default CategoryProduct
