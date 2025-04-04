import React from "react";
import { IoIosSearch } from "react-icons/io";
import { data } from "./data/data";

const Menu = () => {
  return (
    <>
      <div className="bg-gray-100 absolute w-[600px] h-[90vh] overflow-y-scroll -translate-x-full px-5 py-3">
        <h2 className="text-black text-2xl font-semibold">Menu</h2>
        <div className="grid my-2 gap-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="sm:col-span-2 bg-white shadow rounded-md p-5">
              <div
                className={`flex  gap-2 items-center bg-gray-100 px-5 py-2 rounded-full`}
              >
                <IoIosSearch
                  className={`transition-all duration-300 `}
                  size={20}
                />
                <input
                  type="text"
                  className="border-0 outline-0"
                  placeholder="Search Facebook"
                />
              </div>

              {/* items */}
              <ul className="flex  my-5 flex-col gap-1 unstyled">
                {data?.map((item, index) => {
                  return (
                    <div key={index}>
                      <li className="text-md r font-semibold capitalize text-gray-800">
                        {item?.title}
                      </li>
                      {/* nested list */}

                      {item?.list?.map((item2, index2) => {
                        return (
                          <div
                            key={index2}
                            className="flex items-center hover:bg-gray-200 rounded-md cursor-pointer gap-2 p-2"
                          >
                            <img
                              src={item2?.image}
                              width={30}
                              alt="sidebar images"
                            />
                            <div className="flex  flex-col ">
                              <h5 className="text-sm font-semibold">
                                {item2?.heading}
                              </h5>
                              <p className="text-gray-700 text-sm">
                                {item2?.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      {index !== data?.length - 1 && (
                        <hr className="my-3 border-0 h-[1px] bg-gray-300" />
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className="sm:col-span-1 bg-white shadow rounded-md p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
