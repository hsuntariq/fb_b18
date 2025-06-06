import React from 'react';
import FundRaiserSidebar from './FundRaiserSidebar';
import Fundraisers from './Fundraisers';

const FundraisersPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="  hide-scrollbar xl:col-span-3 xl:hidden h-full overflow-y-auto p-4 border-r">
        <FundRaiserSidebar />
      </div>

      {/* Main Content */}
      <div className="col-span-12 xl:col-span-9 hide-scrollbar h-full overflow-y-auto p-4">
        <Fundraisers />
      </div>
    </div>
  );
};

export default FundraisersPage;
