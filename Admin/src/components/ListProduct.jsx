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
    <div className="p-6 bg-gray-100 min-h-screen w-full px-0">
      <h1 className="font-bold text-2xl flex justify-center w-full overflow-x-auto items-center p-3 mb-5">
        All Product List
      </h1>
      <div className="grid grid-cols-7 w-full sticky top-0 z-10  bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg">
        <p>Product</p>
        <p>Title</p>
        <p>Description</p>
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
            <div key={index} className="grid grid-cols-7 gap-5 w-full items-center bg-white px-6 py-4 border-b hover:bg-gray-50 transition rounded-md shadow-sm">
              <img src={product.image} alt="" className="w-14 h-14 object-cover rounded-lg border " />
              <p className="font-semibold font-medium text-gray-800 w-[18%]">{product.name}</p>
              <p className="font-semibold text-[10px] text-gray-800  w-[23%]">{product.description}</p>
              <p className="font-semibold line-through ml-5 text-red-500  w-[14%]">{product.old_price}</p>
              <p className="font-semibold text-green-600 w-[14%]">{product.new_price}</p>
              <p className="font-semibold px-3 py-1 text-sm  roundeed-full bg-blue-100 text-blue-600 w-fit w-[18%]">{product.category}</p>
              <p>
                <MdOutlineDeleteForever onClick={()=>{remove_product(product.id)}} className=" h-10 cursor-pointer hover:scale-110 trnsition w-[13%]"/>
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
