import React from "react";
import Navbar from "../components/home/Navbar";
import { IoMdSettings } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { FriendsSidebar } from "../components/home/friends/FriendsSidebar";
import { shop } from "./market";

const Market = () => {
  return (
    <>
      <div className="sticky top-0 z-10 shadow-md bg-white ">
        {" "}
        <Navbar />
      </div>

      {/* here we start another section  */}
      <div className="grid grid-cols-12 ">
        {/* Sidebar - 3 columns */}
        <div className="col-span-3 bg-white p-2 shadow-2xl sticky top-16 h-[91vh] hidden sm:block">
          {/* friends */}
          <div className="flex items-center justify-between px-2">
            <h1 className="font-bold text-2xl">Friends</h1>
            <div className="h-[40px] w-[40px] bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300  cursor-pointer">
              <IoMdSettings size={25} />
            </div>
          </div>

          {/* HOME */}

          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md my-2 cursor-pointer">
            <div className=" h-[40px] w-[40px] bg-[#1877F2] rounded-full flex items-center justify-center">
              <HiMiniUsers size={25} color="white" />
            </div>
            <p className="text-lg font-semibold">Home</p>
          </div>

          {/* sidebar selection */}

          <ul className="flex flex-col items-center gap-1">
            {FriendsSidebar.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center w-full p-1  hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-2 ">
                  <div className="flex gap-2 items-center justify-center h-[40px] w-[40px] rounded-full bg-gray-200">
                    {item.icon}
                  </div>
                  <span className="text-lg text-gray-800 font-semibold ">
                    {item.title}
                  </span>
                </div>
                <div className="text-gray-500">
                  {item.icons_2 && <div>{item.icons_2}</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content - 9 columns */}
        <div className="col-span-12 sm:col-span-9 sm:bg-gray-100 sm:p-8 p-2">
          {shop?.map((item, index) => {
            return (
              <>
                <div className="flex justify-between items-center">
                  <p className="">{item.title}</p>
                  <div className="div">hello</div>
                </div>
                {item.section.map((item2, index2) => {
                  return (
                    <>
                      <div className="CARD">
                        <img src={item2.image} />
                      </div>
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Market;
