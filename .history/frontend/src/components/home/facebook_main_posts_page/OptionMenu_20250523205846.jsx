import React from "react";

const OptionMenu = () => {
  return (
    <div className="w-[250px] h-[300px] absolute right-[10px] z-100 overflow-y-auto bg-white shadow-lg rounded-md border border-gray-300 p-2">
      <ul className="space-y-2 text-sm text-gray-800">
        <li className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer border border-blue-500">
          <span className="text-xl mr-2">➕</span>
          <div>
            <p className="font-semibold">Interested</p>
            <p className="text-gray-500 text-xs">More of your posts will be like this.</p>
          </div>
        </li>
        <li className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
          <span className="text-xl mr-2">➖</span>
          <div>
            <p className="font-semibold">Not interested</p>
            <p className="text-gray-500 text-xs">Fewer of your posts will be like this.</p>
          </div>
        </li>
        <li className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
          <span className="text-xl mr-2">💾</span>
          <div>
            <p className="font-semibold">Save Post</p>
            <p className="text-gray-500 text-xs">Add this to your saved items.</p>
          </div>
        </li>
        <li className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
          <span className="text-xl mr-2">🔔</span>
          <div>
            <p className="font-semibold">Turn on notifications for this post</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OptionMenu;
