import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { seller_register, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <Header />
      <div className="bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-100 mt-4">
        <div className="w-full justify-center items-center p-10 md:p-4">
          <div className="grid grid-cols-1 w-[45%] lg:w-[65%] md:w-[95%] mx-auto bg-white rounded-2xl shadow-soft overflow-hidden animate-fade-in-up">
            <div className="px-8 py-8 md:px-6">
              <h2 className="text-center w-full text-2xl text-slate-800 font-bold font-display">
                Become a Seller
              </h2>
              <p className="text-center text-sm text-slate-500 mb-5 mt-1">
                Apply to start selling on Easy Shop
              </p>

              <form onSubmit={submit} className="text-slate-600">
                <div className="flex flex-col gap-1 mb-3">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.name}
                    className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.email}
                    className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.password}
                    className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 w-full py-2.5 mt-1 bg-gradient-to-r from-[#059473] to-[#047857] hover:from-[#047857] hover:to-[#065f46] shadow-lg hover:shadow-green-500/40 text-white font-semibold rounded-lg transition-all"
                >
                  Submit Application
                </button>
              </form>

              <div className="text-center text-slate-600 pt-4">
                <p>
                  Already have a seller account?{" "}
                  <a
                    className="text-[#059473] font-semibold hover:underline"
                    href="https://seller.limontechno.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Seller Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeSeller;
