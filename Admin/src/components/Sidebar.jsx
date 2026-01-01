import React from 'react'
import { Link} from 'react-router-dom'
import { BsDatabaseFillAdd } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";



const Sidebar = () => {
  return (
    <div className='flex  justify-between h-screen bg-white-400 shadow-2xl py-3 px-2 flex-col mx-3  '>
      <div className=' w-full px-6  bg-gray-400  h-[70%] rounded-lg '>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
      <div className='flex  border-orange-500 gap-4   text-white px-4 py-3 rounded-lg mt-6 mx-auto cursor-pointer hover:bg-orange-400 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:ease-in-out hover:text-white'>
        <BsDatabaseFillAdd className='w-5 h-5' />
        <h1 className='font-bold'>Add Product</h1>
         
      </div>

      </Link> 
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className='flex  max-w-sm gap-4  text-white px-4 py-3 rounded-lg mt-6 mx-auto cursor-pointer hover:bg-orange-400 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:ease-in-out hover:text-white'>
       <FaClipboardList className='w-5 h-5' />
        <h1 className='font-bold'>Product List</h1>
         
      </div>

      </Link> </div>
      

      
    </div>
  )
}

export default Sidebar
