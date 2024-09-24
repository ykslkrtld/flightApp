import React from 'react';
import { FaTag } from 'react-icons/fa6';
import { FaEarthAmericas } from 'react-icons/fa6';
import { IoAirplane } from 'react-icons/io5';
import profilePhoto from '../../assets/ykslkrtld.jpeg';
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center">
        <IoAirplane className="text-2xl bg-[#4B0097] text-white rounded-full"/>
        <span className="ml-2 font-bold text-lg">PLANE SCAPE</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <FaTag className="text-xl text-[#4B0097]"/>
          <span className="ml-1">Deals</span>
        </div>
        <div className="flex items-center">
          <FaEarthAmericas className="text-xl text-[#4B0097]"/>
          <span className="ml-1">Discover</span>
        </div>
        <div onClick={() => navigate("/my-flights")} className="flex items-center flex-wrap cursor-pointer">
          <img src={profilePhoto} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
          <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-1 ml-2">
            <span className="text-xs md:text-sm">Yüksel</span>
            <span className="text-xs md:text-sm">Kurtuldu</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
