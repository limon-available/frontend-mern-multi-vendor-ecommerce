import React, { useState } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useLocation } from "react-router-dom";
import Stripe from "../components/Stripe";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <Header />
      <section className="bg-slate-100">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`cursor-pointer py-6 px-12 rounded-xl border-2 transition-all ${paymentMethod === "stripe" ? "bg-white border-[#059473] shadow-card" : "bg-white/60 border-transparent hover:border-slate-200"} `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="/images/payment/stripe.png"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-700 font-semibold block text-center mt-1">Stripe</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer py-6 px-12 rounded-xl border-2 transition-all ${paymentMethod === "cod" ? "bg-white border-[#059473] shadow-card" : "bg-white/60 border-transparent hover:border-slate-200"} `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="/images/payment/cod.jpg"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-700 font-semibold block text-center mt-1">COD</span>
                  </div>
                </div>

                {paymentMethod === "stripe" && (
                  <div>
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}
                {paymentMethod === "cod" && (
                  <div className="w-full px-4 py-8 bg-white rounded-xl shadow-card">
                    <button className="px-10 py-2.5 rounded-lg font-semibold hover:shadow-green-500/30 hover:shadow-lg bg-gradient-to-r from-[#059473] to-[#047857] text-white transition-all">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow-card rounded-xl p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="font-bold text-lg text-slate-800 font-display border-b border-slate-100 pb-3">Order Summary </h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included </span>
                    <span>${price} </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold border-t border-slate-100 pt-3">
                    <span>Total Amount </span>
                    <span className="text-xl text-[#059473]">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
