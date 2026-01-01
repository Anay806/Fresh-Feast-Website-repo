import React from "react";
import { useCart } from "../Context/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuNotebookText } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import Lottie from 'lottie-react'
import notFound from '../assets/notFound.json'
import { useNavigate } from "react-router-dom";


const Cart = ({location, getLocation}) => {
  const { cartItems, updateQuantity, deleteItem } = useCart();
  
  
  
  const navigate = useNavigate()
  

  const totalPrice = cartItems.reduce((total, item) => total + item.reviewCount, 0)

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {cartItems.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart({cartItems.length})</h1>
          <div className="mt-10">
            {cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md mt-3"
                    />
                    <div>
                      <h1 className="w-[300px] line-clamp-2">{item.name}</h1>
                      <p className="text-red-500 font-semibold text-lg">
                        {item.reviewCount}
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                    <button onClick={() =>updateQuantity(cartItems, item.id, "decrease")} className="cursor-pointer">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() =>updateQuantity(cartItems, item.id, "increase")} className="cursor-pointer">+</button>
                  </div>
                  <span className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"><RiDeleteBin6Line onClick={() => deleteItem(item.id)} className=" w-7 h-7 text-red-500 cursor-pointer text-2xl" /></span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Full Name</label>
                <input type="text" placeholder="Enter your name"  className="p-2 rounded-md "  />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Address</label>
                <input type="text" placeholder="Enter your address" className="p-2 rounded-md "  />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">State</label>
                  <input type="text" placeholder="Enter your state" className="p-2 rounded-md w-full"/>

                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Postcode</label>
                  <input type="text" placeholder="Enter your postcode" className="p-2 rounded-md w-full" />

                </div>
              </div>
               <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Country</label>
                  <input type="text" placeholder="Enter your country" className="p-2 rounded-md w-full"  />

                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Phone</label>
                  <input type="text" placeholder="Enter your phone number" className="p-2 rounded-md w-full" />

                </div>
              </div>
               <button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-md mt-5 px-3 py-1 ">Submit</button>
                <div className="flex items-center justify-center w-full text-gray-700">
              ------------OR-----------
            </div>
            <div className="flex justify-center">
              <button onClick={() =>getLocation()} className="bg-red-500 text-white px-3 py-2 rounded-md">Detect Location</button>
            </div>
            </div>

            <div className="bg-white border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700"><span><LuNotebookText /></span>Items total</h1>
                <p>${totalPrice}</p>
                

              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700"><span><TbTruckDelivery /></span>Delivery Charge</h1>
                <p className="text-red-500 font-semibold"><span className="text-gray-600 line-through">$25</span> FREE</p>
              </div>
               <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700"><span><FaShoppingBag /></span>Handling Charge</h1>
                <p className=" font-semibold"><span className="text-red-500 ">$5</span></p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand Total</h1>
                <p className="font-semibold text-lg">${totalPrice + 5}</p>
              </div>
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">Apply Promo Code</h1>
                <div className="flex gap-3">
                  <input type="text" placeholder="Enter code" className="p-2 rounded-md w-full "/>
                  <button className="bg-red-500 hover:bg-red-600 text-white border border-gray-200 px-4 cursor-pointer rounded-md">Apply</button>
                </div>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">Proceed to Checkout</button>

            </div>
           

            

          </div>

        </div>
      ) : (
        <div className="flex flex-col mr-4 justify-center items-center md:h-[600px] md:w-[900px] mt-10">
          <h1 className="font-bold text-2xl text-red-500 ">Oh.. No data not found</h1>
          <Lottie animationData={notFound} className="w-[600px] h-[400px] items-center" />
          <button onClick={() =>navigate("/product")}  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4  rounded-md">Countinue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
