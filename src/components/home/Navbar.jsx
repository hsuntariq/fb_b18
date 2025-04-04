import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch, FaSortDown, FaUser } from "react-icons/fa";
import {
  IoIosArrowRoundBack,
  IoIosSearch,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { navbar_data } from "./data/navbarData";
import { BsBellFill, BsFillGrid3X3GapFill, BsMessenger } from "react-icons/bs";
import Menu from "./rightside/Menu";

const Navbar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <nav className="flex  justify-between items-center">
        <div
          className={`flex transition-all p-3 duration-300 items-center gap-2 ${
            focused && "shadow-2xl shadow-gray-400 p-3 rounded-md"
          } `}
        >
          <div
            className={`h-[25px] rounded-full flex justify-center items-center w-[25px] hover:bg-gray-100 cursor-pointer `}
          >
            <IoIosArrowRoundBack
              size={25}
              className={`text-gray-600  transition-all duration-300 ${
                focused
                  ? "opacity-100  -translate-x-0"
                  : "opacity-0  translate-x-15"
              }`}
            />
          </div>
          <img
            width={40}
            src="/images/logo.png"
            className={`transition-all duration-300 ${focused && "hidden"}`}
            alt="facebook logo"
          />
          <div
            className={`flex  gap-2 items-center bg-gray-100 px-5 py-2 rounded-full`}
          >
            <IoIosSearch
              className={`transition-all duration-300 ${focused && "scale-0"}`}
              size={20}
            />
            <input
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              type="text"
              className="border-0 outline-0"
              placeholder="Search Facebook"
            />
          </div>
        </div>

        {/* menu items */}
        <ul className="flex gap-6 unstyled text-gray-600">
          {navbar_data?.map((item, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer group relative hover:bg-gray-100 px-10 py-2 rounded-md"
              >
                {item?.icon}
                <div className="absolute delay-150 mt-1 group-hover:opacity-100 bg-black text-white rounded-xl px-3 py-1 shadow-xl transition-all duration-200 opacity-0  left-1/2 top-full -translate-x-1/2 text-sm">
                  {item?.title}
                </div>
              </li>
            );
          })}
        </ul>

        {/* right sidedata */}
        <div className="flex gap-3 px-5">
          {/* grid */}
          <div className="relative">
            <div className="h-[40px] rounded-full hover:bg-gray-300 cursor-pointer bg-gray-200 w-[40px] flex justify-center items-center">
              <BsFillGrid3X3GapFill size={22} className="text-gray-800" />
            </div>
            <Menu />
          </div>
          {/* messenger */}
          <div className="h-[40px] rounded-full hover:bg-gray-300 cursor-pointer bg-gray-200 w-[40px] flex justify-center items-center">
            <BsMessenger size={22} className="text-gray-800" />
          </div>
          {/* bell */}
          <div className="h-[40px] rounded-full hover:bg-gray-300 cursor-pointer bg-gray-200 w-[40px] flex justify-center items-center">
            <BsBellFill size={22} className="text-gray-800" />
          </div>
          {/* user */}
          <div className="h-[40px] group relative rounded-full hover:bg-gray-300 cursor-pointer bg-gray-200  w-[40px] flex justify-center items-center">
            <FaUser size={22} className="text-gray-500" />
            <div className="bg-gray-200 absolute rounded-full bottom-0 right-0 flex justify-center border border-white border-2  items-center h-[15px] w-[15px]">
              <FaSortDown
                size={10}
                className="text-black -translate-y-1/4 leading-none"
              />
            </div>
            <div className="absolute delay-150 mt-1 group-hover:opacity-100 bg-black text-white rounded-xl px-3 py-1 shadow-xl transition-all duration-200 opacity-0  left-1/2 top-full -translate-x-1/2 text-sm">
              Account
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
