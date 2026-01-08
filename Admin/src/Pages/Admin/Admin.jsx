import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../components/AddProduct'
import ListProduct from '../../components/ListProduct'


const Admin = () => {
  return (
    <div  className='flex min-h-screen bg-gray-100'>
      <Sidebar  />
      <div className='flex-1'>
        <Routes>
          <Route path='/' element={<h1 className='p-6'>Admin Panel</h1>} />
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/listproduct' element={<ListProduct/>} />
        </Routes>
      </div>

    </div>
  )
}

export default Admin
