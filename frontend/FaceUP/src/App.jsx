import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './assets/components/Navbar'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/components/Home'
import Register from './assets/components/Register'
import Login from './assets/components/Login';

function App() {

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='user/registration/' element={<Register/>}/>
          <Route path='user/login/' element={<Login/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
