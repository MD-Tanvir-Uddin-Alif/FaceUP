import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './assets/components/Navbar'
import PrivateRoute from './utils/PrivateRoute'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/components/Home'
import Register from './assets/components/Register'
import Login from './assets/components/Login';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserProfile from './assets/components/UserProfile';
import UpdateProfile from './assets/components/UpdateProfile';



const queryclient = new QueryClient();


function App() {

  return (
    <div>
      <QueryClientProvider client={queryclient}>
        <ToastContainer position="top-center" autoClose={3000} />
        <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='user/registration/' element={<Register/>}/>
          <Route path='user/login/' element={<Login/>}/>
          <Route path='user/profile/' element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
          <Route path='user/profile/update/' element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
        </Routes>
        </HashRouter>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </div>
  )
}

export default App
