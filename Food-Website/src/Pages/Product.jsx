import React, { useEffect, useState } from "react";
import { getData } from "../Context/DataContext";
import FilterSection from "../Components/FilterSection";
import starr from "../images/starr.png";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Pegination from "../Components/Pegination";

const Product = () => {
  const { data, featchProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] =  useState(1)
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  

  useEffect(() => {
    featchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const pageHandler = (selectedPage) =>{
    setPage(selectedPage)
  }

 

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(search?.toLowerCase()) &&
    (category === 'All' || item.cuisine === category) &&
    (brand === 'All' || item.difficulty === brand) &&
    (item.caloriesPerServing >= priceRange[0] && item.caloriesPerServing <= priceRange[1])
  )

   const dynamicPage = Math.ceil(filteredData?.length / 8)

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4  ">
        {data?.length > 0 ? (
          <div >
            <div className="flex gap-4">
            <FilterSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
            ></FilterSection>
            <div className="grid grid-cols-4 gap-2  mt-10 mb-40 flex-1">
              {filteredData?.slice(page * 8 - 8,page * 8).map((item, index) => {
                return (
                  <>
                  <div
                    key={index}
                    className="border  relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max "
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="bg-gray-100 aspect-square"
                      onClick={() => navigate(`/product/${item.id}`)}
                    />

                    <div className=" items-center  bg-gray-200 rounded-md">
                      <div className=" flex">
                        <p className="font-bold text-orange-600 line-clamp-1 ">
                          {item.name}
                        </p>
                      </div>

                      <div className="flex  justify-between items-center ">
                        <div>
                          <div className="  w-[40px] justify-center items-center font-bold text-orange-800 text-red text-[20px] px-1">
                            ${item.caloriesPerServing}
                          </div>
                        </div>
                        <div className="flex pr-3 ">
                           <img src={starr} alt="star" className="w-12 h-12" />
                        <p className=" mt-3  font-bold text-orange-600 items-center">
                          {item.rating}
                        </p>
                        </div>
                       
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 w-full text-white font-bold  rounded-md py-1 flex gap-2 py-1 my-2 items-center justify-center"
                    >
                      <SlBasket className="w-6 h-6 justify-center items-center" />
                      Add to Card
                    </button>
                  </div>
                
                  </>
                );
              })}
            </div>
           </div>
            <Pegination pageHandler={pageHandler} page={page}  dynamicPage={dynamicPage}/>
          </div>
        ) : (
          <div>
            <h1>Data not found</h1>
          </div>
        )}
          
      </div>
    </div>
  );
};

export default Product;
