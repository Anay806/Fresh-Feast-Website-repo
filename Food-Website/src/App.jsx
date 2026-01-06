import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Product from './Pages/Product'
import About from "./Pages/About"
import Contact from "./Pages/Contract"
import Cart from './Pages/Cart'
import axios from 'axios'
import Footer from './Components/Footer'
import SingleProductPage from './Pages/SingleProductPage'
import CategoryProduct from './Pages/CategoryProduct'
import Loginpopup from './Pages/Loginpopup'


const App = () => {
  
  const [location, setLocation] = useState()
  const [openDropDown, setOpenDropDown] = useState(false)

  const getLocation = async () =>{
    navigator.geolocation.getCurrentPosition(async pos =>{
      const { latitude, longitude} = pos.coords
      

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
       
     try {
      const location = await axios.get(url)
     
      
      
      const exactLocation = location.data.address
      setLocation(exactLocation)
      setOpenDropDown(false)
      
     } catch (error) {
      console.log(error);
      
      
     }
      
    })
  }

  useEffect(() =>{
    getLocation()
  
  },[])
  return (
    <>
    <BrowserRouter>
     
    <Navbar getLocation={getLocation} location={location} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown}></Navbar>
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<SingleProductPage />} />
        <Route path='/category/:cuisine' element={<CategoryProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/contract' element={<Contact />} />
        <Route path = '/Loginpopup' element={<Loginpopup />} />
        <Route path='/cart' element={<Cart location={location} getLocation={getLocation} />} />

      </Routes>
      
      
    </div>
    <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App
