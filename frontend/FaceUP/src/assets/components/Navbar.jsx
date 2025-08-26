import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('accessToken'));
    useEffect(() => {
    const updateLoginStatus = () => {
      setIsLogin(!!localStorage.getItem('accessToken'));

      if (!localStorage.getItem('accessToken')) {
        setUserProfile(null);
      }
    };


    window.addEventListener('loginStatusChanged', updateLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', updateLoginStatus);
    };
  }, []);



  return (
    <div>
        <nav class="bg-white shadow sticky top-0 z-10">
            <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                <div class="flex items-center space-x-3">
                <a href="/" class="text-xl font-bold text-black">FaceUP</a>
                </div>

                <div class="flex items-center space-x-6">
                    <NavLink to='/' className={({ isActive }) => `text-black font-semibold ${isActive ? 'underline' : ''}`}>Home</NavLink>
                    <a href="/events" class="text-black font-semibold hover:underline">Events</a>
                </div>

                <div>
                {!isLogin?(
                    <Link to='user/login/'>
                    <button class="rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">
                    Login
                    </button>
                </Link>
                ):(
                    <div className="relative inline-block text-left">
                    <input type="checkbox" id="dropdownToggle" className="hidden peer" />
                    <label htmlFor="dropdownToggle" className="cursor-pointer">
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-14 h-14 rounded-full border border-black object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
                />
              </label>

              {/* <div className="dropdown-menu hidden peer-checked:block absolute right-0 mt-2 w-40 bg-white border border-black rounded-lg shadow-md z-10">
                <Link to='/profile'>
                <button className="w-full text-left block px-4 py-2 text-sm hover:bg-black hover:text-white transition">Profile</button>
                </Link>
                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm hover:bg-black hover:text-white transition">Logout</button>
              </div> */}
            </div>
                )}
                <Link to='user/login/'>
                    <button class="rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">
                    Login
                    </button>
                </Link>
                </div>

            </div>
        </nav>
    </div>
  )
}

export default Navbar