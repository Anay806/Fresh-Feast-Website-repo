import React from "react";

const Contract = () => {
  return (
    <div className="bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] via-[#fdbb2d] to-[#00c9ff] flex flex-col  h-screen w-full">
      <div className="mt-20 items-center justify-center ml-[300px]" data-aos="fade-left">
        <h1 className="text-white text-3xl font-bold">Connect with us,</h1>
        <p className="text-white text-xl font-semibold">
          Here you can send the massages for my team..
        </p>
      </div>
      <div className=" ml-[300px] rounded-md mt-5 bg-gray-500 w-[60%] h-[470px]" data-aos="fade-up">
        <h1 className="text-white mt-7 text-xl ml-5 font-semibold">
          Send your request
        </h1>

        <div className=" flex  mx-5 mt-5 " >
          <div className="grid grid-col-2 gap-2 w-[60%] border-white   border-r-2 ">
            <div className="flex flex-col">
              <label htmlFor="" className="text-white mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className=" mr-2 p-1 rounded-md outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-white mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="mr-2 p-1 outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-white mb-1">
                Contact No.
              </label>
              <input
                type="text"
                placeholder="Enter your Contact Number"
                className="mr-2  p-1 outline-none rounded-md"
              />
            </div>
            <div className="flex  flex-col">
              <label htmlFor="" className="mb-1 text-white">
                Massages
              </label>
              <input
                type="text"
                placeholder="Enter your Msg!"
                className="outline-none p-1 mr-2 rounded-md h-12"
              />
            </div>
          </div>
          <div className=" px-6 flex flex-col gap-3 w-[40%] ">
            <h1 className="text-white font-bold text-[16px]">Reach Us,</h1>
            <div className=" flex flex-col mt-6 gap-6">
              <div className="flex gap-6">
               <h2 className="text-white font-semibold">Email</h2>
                <p className="text-white font-semibold">
                  anayshrivastava9@gmail.com
                </p>
              </div>
               <div className="flex gap-6">
               <h2 className="text-white font-semibold">Phone</h2>
                <p className="text-white font-semibold">
                  9356416493
                </p>
              </div>
               <div className="flex gap-6">
               <h2 className="text-white font-semibold">Address</h2>
                <p className="text-white font-semibold">
                BLOCK 1st floar, Radhakrishna residency A,
                 No 69/1, 64th cross, 3rd Main Rd,
                  RMV 2nd Stage, Ashwath Nagar, 
                  Armane Nagar, Bengaluru, 
                  Karnataka (562157)
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-5 items-center ml-90 mt-9 font-semibold py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contract;
