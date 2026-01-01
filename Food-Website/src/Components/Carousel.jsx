import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Slider from "react-slick";
import { getData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { data, featchProducts } = getData();
  const navigate = useNavigate()

  useEffect(() => {
    featchProducts();
  }, []);

  

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight
          className="arrow"
          style={{
            ...style,
            display: "block",
            fontSize:"24px",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{zIndex:3}}
      >
        <AiOutlineArrowLeft
          className="arrow"
          style={{
            ...style,
            display: "block",
            fontSize:"24px",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div >
      <Slider {...settings}>
        {Array.isArray(data) &&
          data.slice(0, 29).map((item, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] via-[#fdbb2d] to-[#00c9ff] h-[600px] -z-10"
              >
                <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4">
                  <div className="md:space-y-6 space-y-3">
                    <h3 className="text-red-800 font-semibold font-sans text-sm">
                      Powering the world with the best Food Items
                    </h3>
                    <h1 className="md:text-4xl text-xl   font-white font-bold Uppercase lineclamp-2 ">
                      {item.name}
                    </h1>
                    <p className="md:w-[500px] lineclamp-3  text-white-700 pr-7">
                      {item.ingredients}
                    </p>
                    <button  onClick={()=>navigate(`/product/${item.id}`)} className="bg-gradient-to-r from-[#FD7F2C] to-[#FF6200] rounded-md px-3 py-1 text-white font-semibold hover:scale-105 ">
                      Shop now
                    </button>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-ren-200"
                    onClick={() =>navigate(`/product/${item.id}`)}
                  />
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Carousel;
