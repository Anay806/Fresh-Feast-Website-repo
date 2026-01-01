import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrums from "../Components/BreadCrums";
import Category from "../Components/Category";
import star from "../images/star.png";
import {IoCartOutline} from "react-icons/io5"
import { useCart } from "../Context/CartContext";


const SingleProductPage = () => {
  const params = useParams();
   const {addToCart, cartItems} = useCart()
  
  

  const [singleProduct, setSingleProduct] = useState("");

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/recipes/${params.id}`);
      const singleProduct = res.data;
      console.log(singleProduct);

      setSingleProduct(singleProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <BreadCrums name={singleProduct.name}></BreadCrums>
          <div className="max-w-6xl  mx-auto md:p-6 grid grid-cols-2 gap-10">
            {/* product-image */}
            <div className="w-full">
              <img
                src={singleProduct.image}
                className="rounded-2xl w-full object-cover"
                alt=""
              />
            </div>
            {/* product-details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl font-bold text-gray-800">
                {singleProduct.name}
              </h1>
              <div className=" font-semibold text-xl text-gray-600">
                {singleProduct.cuisine?.toUpperCase()} /{" "}
                {singleProduct.mealType} / {singleProduct.ingredients}
              </div>
              <div className="flex gap-8 items-center">
                <p className="text-2xl text-red-500 font-bold">
                  $ {singleProduct.reviewCount}
                </p>
                <div className="flex gap-2 items-center ml-8 ">
                  
                  <img src={star} alt="" />
                  <p className="text-white font-bold mb-1 bg-red-500 py-1 px-2 rounded-full">{singleProduct.rating}</p>
                </div>
              </div>

              <p className="text-gray-500 mt-5 text-[16px]">
                Welcome to a world of taste and <span className="text-orange-500 font-semibold">{singleProduct.name}!</span> Our hotel
                restaurant brings you a perfect blend of flavor, freshness, and
                luxury. Every dish is crafted with care using the finest
                ingredients to satisfy your cravings. Enjoy a warm ambiance,
                exceptional service, and mouth-watering recipes that make every
                meal unforgettable. Come, dine with us, and experience the true
                joy of delicious hospitality
              </p>

              {/* Quentity-section */}
              <div className="flex gap-4 items-center">
                <label htmlFor="" className="text-sm font-medium text-gray-700 ">Quentity :</label>
                <input type="number" min={1} className="w-20 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
              </div>
               <button onClick={() =>addToCart(singleProduct)}  className="bg-red-500 w-[180px] font-bold rounded-md px-2 flex gap-2 py-1 text-white items-center cursor-pointer mt-5 "><IoCartOutline className="w-6 h-6 ml-4"  /> Add to Cart</button>
            </div>
           
          </div>
        </div>
      ) : (
        <div>Data not ffound</div>
      )}
    </>
  );
};

export default SingleProductPage;
