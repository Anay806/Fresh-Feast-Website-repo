import React from 'react'
import Navbar from './components/Navbar.jsx'
import Admin from './Pages/Admin/Admin.jsx'
import {Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <div>
    <Navbar></Navbar>
    <Routes>
      <Route path='/*' element={<Admin />} />
    </Routes>
    </div>
  )
}

export default App
