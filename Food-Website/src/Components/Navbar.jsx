import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { FaCaretDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useCart } from "../Context/CartContext";


const Navbar = ({ getLocation, location , openDropDown, setOpenDropDown}) => {
  const toggleDropDown =() =>{
    setOpenDropDown(!openDropDown)
  }
   const { cartItems } = useCart();
  return (
    <div className=" w-full shadow-2xl px-4 py-3 sticky top-0 z-50 isolation-isolate bg-white-500 ">
      <div className="flex justify-between items-center  max-w-6xl mx-auto ">
        {/* Logo-section */}
        <div className=" gap-7 flex items-center ">
          <Link to="/">
            <h1 className="text-4xl font-bold font-sans-serif cursor-pointer ">
              <span className="text-orange-600">F</span>resh{" "}
              <span className="text-orange-600">F</span>east
            </h1>
          </Link>
          <div className="flex items-center gap-3 font-semibold">
            <SlLocationPin className="text-orange-600 h-5 w-5" />
            <span>
              {location ? (
                <div className="">
                  <p>{location.city}</p>
                  <p>{location.state}</p>
                </div>
              ) : "Add Address"}
            </span>
            <FaCaretDown className="text-orange-700 -px-3" onClick={toggleDropDown} />
          </div>
          {
            openDropDown ?
             <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-80 border-2 p-5 border-gray-100 rounded-md">
              <h1 className=" flex font-semibold justify-between mb-4 text-xl">Change Location  <span>{toggleDropDown}<CgClose onClick={toggleDropDown} /></span></h1>
              <button onClick={getLocation} className="bg-orange-600 rounded-md px-5 py-1 text-white cursor-pointer hover:bg-orange-500">Detect Mt Location</button>

            </div>
             : null
          }
        </div>
        {/* NAvbar-section */}
        <nav className="flex gap-7">
          <ul className="flex gap-7 items-center font-semibold text-xl">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-orange-600"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/product"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-orange-600"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Product</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-orange-600"
                    : "text-black"
                } cursor-pointer`
              }
            >
              {" "}
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contract"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-orange-600"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
            {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} className="bg-orange-600 text-white px-3 py-1 text-[18px] rounded-md">Logout</button>: <NavLink to={"/Loginpopup"}
             className={({isActive}) =>
              `${ 
                isActive 
                ? "bg-orange-500 text-white px-3 py-1 text-[18px] rounded-md" 
                : "bg-orange-600 text-white py-1 px-3 text-[18px] rounded-md"}cursor-pointer rounded-md`
            }><li>Login</li>

            

            </NavLink>}
           
          </ul>

          <Link to={"/cart"} className="relative">
            <FiShoppingCart className="w-7 h-7 items-center" />
            <span className="bg-orange-600 rounded-full absolute px-2 -top-3 -right-3 text-white">
            {cartItems.length}
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
