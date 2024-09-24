import React from 'react'
import { useNavigate } from "react-router-dom";


const Header = () => {

    const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg w-full px-4 sm:px-10 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-wrap space-x-2 sm:space-x-4">
            <button onClick={() => navigate("/")} className="bg-red-500 hover:bg-red-700 text-white hover:text-black font-bold py-2 px-4 rounded">Home</button>
            <button className="border border-gray-200 bg-white-200 text-black py-2 px-4 rounded">Times</button>
            <button className="border border-gray-200 bg-white-200 text-black py-2 px-4 rounded">Stops</button>
            <button className="border border-gray-200 bg-white-200 text-black py-2 px-4 rounded">Airlines</button>
            <button className="border border-gray-200 bg-white-200 text-black py-2 px-4 rounded">Airports</button>
            <button className="border border-gray-200 bg-white-200 text-black py-2 px-4 rounded">Amenities</button>
          <select className="bg-white-200 text-blue-400 rounded py-2 px-4">
            <option>Edit Search</option>
          </select>
          </div>
        <div className="flex flex-wrap justify-end mb-4 space-x-2 sm:space-x-4">
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
              <span className="text-gray-300">★</span>
            </div>
            <div className="flex space-x-1">
              <span className="text-gray-300">★</span>
              <span className="text-gray-300">★</span>
              <span className="text-gray-300">★</span>
            </div>
          </div>
          <div className="border-l-2 border-gray-300 h-12"></div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
            </div>
            <div className="flex space-x-1">
              <span className="text-gray-300">★</span>
              <span className="text-gray-300">★</span>
              <span className="text-gray-300">★</span>
            </div>
          </div>
          <div className="border-l-2 border-gray-300 h-12"></div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
            </div>
            <div className="flex space-x-1">
              <span className="text-black-300">★</span>
              <span className="text-gray-300">★</span>
              <span className="text-gray-300">★</span>
            </div>
          </div>
          <div className="border-l-2 border-gray-300 h-12"></div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
            </div>
            <div className="flex space-x-1">
              <span className="text-black-300">★</span>
              <span className="text-black-300">★</span>
              <span className="text-gray-300">★</span>
            </div>
          </div>
          <div className="border-l-2 border-gray-300 h-12"></div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
              <span className="text-black-500">★</span>
            </div>
            <div className="flex space-x-1">
              <span className="text-black-300">★</span>
              <span className="text-black-300">★</span>
              <span className="text-black-300">★</span>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Header