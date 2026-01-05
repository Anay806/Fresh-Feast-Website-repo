import React, { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async(id) =>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
       'Content-Type' : 'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="bg-white w-full h-full mt-3 rounded-md px-5 shadow-2xl overflow-auto">
      <h1 className="font-bold text-2xl flex justify-center items-center p-3 mb-5">
        All Product List
      </h1>
      <div className="flex justify-between gap-3 font-bold mt-10 text-xl">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div>
        <hr />
        {allProducts.map((product, index) => {
          return (
            <>
            <div key={index} className="flex justify-between items-center gap-3">
              <img src={product.image} alt="" className="w-[80px] rounded-md my-2 " />
              <p className="font-semibold">{product.name}</p>
              <p className="font-semibold">{product.old_price}</p>
              <p className="font-semibold">{product.new_price}</p>
              <p className="font-semibold">{product.category}</p>
              <p>
                <MdOutlineDeleteForever onClick={()=>{remove_product(product.id)}} className="w-9 h-7 cursor-pointer"/>
              </p>
            </div>
            <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
