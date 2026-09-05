import React from "react";
import { Link } from "react-router-dom";

const SellerCta = () => {
  return (
    <section className="w-full py-10 md:py-8 bg-gradient-to-r from-emerald-50 via-white to-emerald-50">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-card border border-emerald-50 px-10 py-10 md:px-6 md:py-8 text-center">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-emerald-100/50 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-100/40 rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-xl text-slate-800 font-bold font-display mb-2">
              Want to sell on Easy Shop?
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Join thousands of sellers and start growing your business today.
            </p>
            <Link
              to="/become-a-seller"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#059473] to-[#047857] hover:from-[#047857] hover:to-[#065f46] shadow-lg hover:shadow-green-500/40 text-white font-semibold rounded-lg transition-all"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCta;
