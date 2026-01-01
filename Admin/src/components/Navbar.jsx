import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white-400 w-full shadow-2xl px-4 py-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <div className='gap-2 flex items-center'>
          <h1 className='text-4xl font-bold font-sans-serif cursor-pointer'><span className='text-orange-600'>F</span>resh</h1>
          <h1 className='text-4xl font-bold font-sans-serif cursor-pointer'><span className='text-orange-600'>F</span>east</h1>
        </div>
        <div>
          <h1 className='font-bold text-orange-500 text-2xl cursor-pointer px-3 py-2'>
            Admin Panel
          </h1>
        </div>

      </div>
      
    </div>
  )
}

export default Navbar
