import React, { useState } from "react";

import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
function Navbar() {

const[visible,setvisible]=useState(false);

  return (
    <div className="flex  items-center justify-between py-5 font-medium">
     <Link to="/"> <img src={assets.logo} className="w-36" alt="" /></Link>
      <ul className="hidden sm:flex gap-5 test-sm text-gray-700">
        <NavLink
          to="/"
          className="font-medium flex flex-col items-center gap-1"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/Collection"
          className="font-medium flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/About"
          className="font-medium flex flex-col items-center gap-1"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/Contact"
          className="font-medium flex flex-col items-center gap-1"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"  />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img src={assets.search_icon} alt="" className="w-5 cursor-pointer " />

        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100">
              <p className="cursor-pointer text-gray-500 hover:text-black">
                My Profile
              </p>
              <p className="cursor-pointer  text-gray-500    hover:text-black">
                Orders
              </p>
              <p className="cursor-pointer  text-gray-500  hover:text-black">
                Logout
              </p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 cursor-pointer" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            10
          </p>

        </Link>
        <img onClick={()=>setvisible(true)} src={assets.menu_icon} className=" cursor-pointer  " alt="" />
      </div>
     {/*menu bar the small class*/}

      <div className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? `w-full`:`w-0`}`}>

        <div className="flex flex-col text-gray-600 cursor-pointer"></div>
           <div onClick={()=>setvisible(false)} className="flex item-center gap-4 p-3">

            <img src={assets.dropdown_icon} className='h-4 rotate-180 m-[5px]' alt="" />
            <h1 className="top-[-4px] cursor-pointer text-red-700 ">Back</h1>
           </div>
           <div className="flex flex-col ">
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to="/" >HOME</NavLink>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
           
           </div>
           
      </div>



    </div>
  );
}

export default Navbar;
