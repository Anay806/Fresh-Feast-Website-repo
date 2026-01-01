import React, { useEffect } from "react";
import { getData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { CategoryOnlyData } = getData();
  const navigate = useNavigate()


  

  return (
    <div className="w-full  h-[70px] py-2 bg-gray-300 shadow-2xl mt-5 ">
      <div className="flex justify-around items-center  cursor-pointer">
        {CategoryOnlyData?.slice(0, 8).map((item, index) => {
          return (
            <div key={index} className=" items-center mt-4 font-semibold   texttext-xl ">
              <button onClick={() =>navigate(`/category/${item}`)} className="uppercase bg-orange-600 text-white px-4 py-2 rounded-md cursor-pointer">{item}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
