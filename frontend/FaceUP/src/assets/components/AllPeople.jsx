import React from 'react'

const AllPeople = () => {
  return (
    <div>
        <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-black">Suggestions</h3>
        <div className="flex min-h-20 items-center justify-between gap-4 bg-white px-4 py-2 border rounded-md">
        <div className="flex items-center gap-4">
            <div className="aspect-square h-14 w-14 rounded-full bg-cover bg-center bg-no-repeat" ></div>
            <div className="flex flex-col justify-center">
            <p className="text-base font-medium text-black">Noah Thompson</p>
            </div>
        </div>
        <button class="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300">Send Request</button>
        </div>
    </div>
  )
}

export default AllPeople