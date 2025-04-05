import React from "react";
import { FaUser } from "react-icons/fa";

const AccountSettings = () => {
  return (
    <>
      <div className="bg-white absolute right-0 top-full p-5 shadow-lg shadow-gray-400 w-[400px]  rounded-md">
        <div className="p-4 rounded-md-p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-[35px] h-[35px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
              <FaUser className="text-gray-600" />
            </div>
            <h4 className="text-md font-semibold">Username</h4>
          </div>
          <hr className="my-3 border-0 h-[1px] bg-gray-300" />
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
