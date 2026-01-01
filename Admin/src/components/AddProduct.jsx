import React from 'react'
import { TbWorldUpload } from "react-icons/tb";

const AddProduct = () => {
  return (
    <div className='flex flex-col bg-gray-50 w-[50%] gap-6 px-4 py-3 rounded-md mx-6 my-4 shadow-lg'>
      <div className='w-full'>
        <p className='font-semibold text-xl py-1'>Product Name</p>
        <input type="text" name='name' placeholder='Type here' className='w-full px-4 py-2 bg-gray-50 border border-orange-300 rounded-md outline-none focus:ring-orange-600' />
      </div>
      <div className='flex' >
        <div className='w-[45%] py-1'>
          <p className='font-semibold text-xl py-1'>Price</p>
          <input type="text" placeholder='Enter Price here' name='old_price' className='w-full px-4 py-2 bg-gray-50 border border-orange-300 rounded-md outline-none focus:ring-orange-600  '/>
        </div>
        <div className='py-1 w-[45%] ml-6'>
          <p className='font-semibold text-xl py-1'>Offer Price</p>
          <input type="text" placeholder='Type here' name='new_price' className='w-full px-4 py-2 bg-gray-50 border border-orange-300 rounded-md outline-none focus:ring-orange-600' />
        </div>
      </div>
      <div className='py-4'>
        <p className='font-semibold text-xl font-sans-serif py-1'>Product Category</p>
        <select name="category" className='bg-gray-50 border border-orange-300 rounded-md px-4  py-2 w-[45%] outline-none focus:ring-orange-600'>
          <option value="Veg" >Veg</option>
           <option value="Veg">Non-Veg</option>
            <option value="Veg">Noodles</option>
             <option value="Veg">Chinese</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <TbWorldUpload  className='w-[20%] h-9 '/>
        </label>
        <input type="file" name='image' className=''/>
      </div>
      <button className='bg-orange-500 mt-4 hover:bg-orange-600 items-center justify-center flex w-[20%] cursor-pointer py-3 rounded-md text-white font-bold text-xl'>Add</button>
      
    </div>
  )
}

export default AddProduct
