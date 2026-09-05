import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_register,
  customer_google_login,
  customer_facebook_login,
  messageClear,
} from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { DASHBOARD_URL } from "../config/app";
import { FadeLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";
import { facebookLogin } from "../utils/facebookAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth,
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      dispatch(customer_google_login(tokenResponse.access_token)),
    onError: () => toast.error("Google sign-in failed"),
  });

  const handleFacebookLogin = async () => {
    try {
      const { accessToken } = await facebookLogin();
      dispatch(customer_facebook_login(accessToken));
    } catch (error) {
      toast.error(error.message || "Facebook sign-in failed");
    }
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
    if (userInfo) {
      navigate("/");
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
          <div className="grid grid-cols-2 md:grid-cols-1 w-[60%] lg:w-[80%] md:w-[95%] mx-auto bg-white rounded-2xl shadow-soft overflow-hidden animate-fade-in-up">
            <div className="px-8 py-8 md:px-6">
              <h2 className="text-center w-full text-2xl text-slate-800 font-bold font-display">
                Create Account{" "}
              </h2>
              <p className="text-center text-sm text-slate-500 mb-5 mt-1">
                Join us and start shopping today
              </p>

              <div>
                <form onSubmit={register} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
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
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
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

                  <button className="px-8 w-full py-2.5 mt-1 bg-gradient-to-r from-[#059473] to-[#047857] hover:from-[#047857] hover:to-[#065f46] shadow-lg hover:shadow-green-500/40 text-white font-semibold rounded-lg transition-all">
                    Register
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                  <span className="px-3 text-slate-600">Or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                </div>

                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3"
                >
                  <span>
                    <FaFacebookF />{" "}
                  </span>
                  <span>Login With Facebook </span>
                </button>

                <button
                  type="button"
                  onClick={() => googleLogin()}
                  className="px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3"
                >
                  <span>
                    <FaGoogle />
                  </span>
                  <span>Login With Google </span>
                </button>
              </div>

              <div className="text-center text-slate-600 pt-1">
                <p>
                  You Have No Account?{" "}
                  <Link className="text-blue-500" to="/login">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
              </div>

              <a target="_blank" rel="noreferrer" href={`${DASHBOARD_URL}/login`}>
                <div className="px-8 w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  Login As a Seller
                </div>
              </a>

              <a target="_blank" rel="noreferrer" href={`${DASHBOARD_URL}/register`}>
                <div className="px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  Register As a Seller
                </div>
              </a>
            </div>

            <div className="w-full h-full md:hidden bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center">
              <img src="/images/login.jpg" className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
