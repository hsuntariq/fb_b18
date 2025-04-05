import React from "react";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <div className="min-h-screen p-5 bg-gray-500">
        <div className="flex gap-2">
          <div className="flex items-center gap-3">
            <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
              <FaUser size={25} className="text-gray-600" />
            </div>
            <h4 className="text-md font-semibold">Username</h4>
          </div>
        </div>

        {/* sidebar data */}
      </div>
    </>
  );
};

export default Sidebar;
