import React from 'react'
import Sidebar from '../../components/Sidebar'
import {Route, Routes} from 'react-router-dom'
import AddProduct from '../../components/AddProduct'
import ListProduct from '../../components/ListProduct'

const Admin = () => {
  return (
    <div  className='flex'>
      <Sidebar />
      <Routes >
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path='/ListProduct' element={<ListProduct />} />
      </Routes>

    </div>
  )
}

export default Admin
