import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
                <a href="/login">
                    <button class="rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition">
                    Login
                    </button>
                </a>
                </div>

            </div>
        </nav>
    </div>
  )
}

export default Navbar