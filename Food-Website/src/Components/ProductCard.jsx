import React, { useEffect } from "react";
import { getData } from "../Context/DataContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const ProductCard = () => {
   const {addToCart, cartItems} = useCart()
  const navigate = useNavigate()
  const { data, featchProducts } = getData();

  useEffect(() => {
    featchProducts();
  }, []);
  return (
    <div className="w-full mt-9 ">
      <h1 className="text-2xl font-bold text-gray-700 ml-7">
        Inspiration for your first order.
      </h1>
      <p className="text-[15px] w-[60%] ml-7 mt-9 line-clamp-2 text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
        explicabo autem illo possimus sint laboriosam dolor. Ipsum dolore ullam
        nostrum! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
        beatae.
      </p>
      {/* // max-w-6xl  neeche wale div me likhna hai jisse size chota ho jayega */}
      <div className=" w-7xl  mx-auto px-4 mb-10">
        {data?.length > 0 ? (
          <div className="flex gap-8">
            <div className="grid grid-cols-4 gap-7 mt-10 ">
              {
                data?.slice(0,31).map((product, index) =>{
                  return <div key={index} className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max"><img src={product.image} alt="" onClick={()=>navigate(`/product/${product.id}`)} className="bg-gray-100 aspect-square" />
                  <h1 className="line-clamp-2 p-1 font-semibold">{product.name}</h1>
                  <p className="my-1 text-lg text-gray-800 font-bold">₹{product.new_price}</p>
                  <button onClick={() =>addToCart(product)} className="bg-orange-600 hover:bg-orange-700 px-3 py-2 text-lg text-lg rounded-md text-white w-full cursor-pointer flex gap-1 items-center justify-center font-semibold "><MdOutlineShoppingCart className="w-6 h-6" />Add to cart</button>
                  
                  </div>
                })
              }
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]"> </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
