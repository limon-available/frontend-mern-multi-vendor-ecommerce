import React from "react";
import { Link } from "react-router-dom";

const SellerCta = () => {
  return (
    <div className="w-full">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex flex-col justify-center items-center gap-4 py-8 md-lg:py-6 md:py-5">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl md-lg:text-xl sm:text-lg text-slate-700 font-bold text-center">
              Want to sell on Easy Shop?
            </h2>
            <div className="w-[80px] h-[2px] bg-[#059473]"></div>
          </div>

          <Link
            to="/become-a-seller"
            className="px-8 py-2.5 bg-[#059473] shadow-lg hover:shadow-green-500/40 hover:bg-[#048466] text-white font-semibold rounded-md transition-all duration-200"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerCta;