import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { SOCIAL_LINKS } from "../config/socialLinks";

const Footer = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card,
  );

  const [email, setEmail] = useState("");
  const [subscribeMsg, setSubscribeMsg] = useState({ type: "", text: "" });

  const subscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setSubscribeMsg({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }
    setSubscribeMsg({
      type: "success",
      text: "Thank you for subscribing!",
    });
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="w-[85%] flex flex-wrap mx-auto border-b border-white/10 py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] h-[70px] object-contain brightness-0 invert"
              src="/images/logo.png"
              alt="logo"
            />
            <ul className="flex flex-col gap-2 text-slate-400">
              <li>
                Address : 2504 Ivins Avenue, Egg Harbor Township, NJ 08234,
              </li>
              <li>Phone : 4343434344</li>
              <li>Email : support@easylearingbd.com</li>
            </ul>
          </div>
        </div>

        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2 text-white">Usefull Links </h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-400 text-sm font-medium [&_a:hover]:text-emerald-400 [&_a]:transition-colors">
                  <li>
                    <Link to="/about">About Us </Link>
                  </li>
                  <li>
                    <Link to="/shops">About Our Shop </Link>
                  </li>
                  <li>
                    <Link to="/contact">Delivery Information </Link>
                  </li>
                  <li>
                    <Link to="/about">Privacy Policy </Link>
                  </li>
                  <li>
                    <Link to="/blog">Blogs </Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-2 text-slate-400 text-sm font-medium [&_a:hover]:text-emerald-400 [&_a]:transition-colors">
                  <li>
                    <Link to="/shops">Our Service </Link>
                  </li>
                  <li>
                    <Link to="/about">Company Profile</Link>
                  </li>
                  <li>
                    <Link to="/contact">Delivery Information </Link>
                  </li>
                  <li>
                    <Link to="/about">Privacy Policy </Link>
                  </li>
                  <li>
                    <Link to="/blog">Blogs </Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-2 text-slate-400 text-sm font-medium [&_a:hover]:text-emerald-400 [&_a]:transition-colors">
                  <li>
                    <h2 className="font-bold text-lg mb-2 text-white">For Sellers</h2>
                  </li>
                  <li>
                    <a
                      href="https://seller.limontechno.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Seller Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2 text-white">Join Our Shop</h2>
            <span className="text-slate-400">
              Get Email updates about tour latest and shop specials offers
            </span>
            <form onSubmit={subscribe}>
              <div className="h-[50px] w-full bg-white rounded-xl overflow-hidden border border-white/10 relative">
                <input
                  className="h-full bg-transparent w-full px-4 outline-0 text-slate-700"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <button
                  type="submit"
                  className="h-full absolute right-0 bg-gradient-to-r from-[#059473] to-[#047857] text-white uppercase px-5 font-bold text-sm hover:from-[#047857] hover:to-[#065f46] transition-all"
                >
                  Subscribe
                </button>
              </div>
              {subscribeMsg.text && (
                <p
                  className={`mt-2 text-sm font-semibold ${
                    subscribeMsg.type === "success"
                      ? "text-[#059473]"
                      : "text-red-500"
                  }`}
                >
                  {subscribeMsg.text}
                </p>
              )}
            </form>
            <ul className="flex justify-start items-center gap-3">
              <li>
                <a
                  className="w-[40px] h-[40px] text-slate-300 hover:bg-[#059473] hover:text-white hover:-translate-y-1 flex justify-center items-center bg-white/10 rounded-full transition-all"
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />{" "}
                </a>
              </li>

              <li>
                <a
                  className="w-[40px] h-[40px] text-slate-300 hover:bg-[#059473] hover:text-white hover:-translate-y-1 flex justify-center items-center bg-white/10 rounded-full transition-all"
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />{" "}
                </a>
              </li>
              <li>
                <a
                  className="w-[40px] h-[40px] text-slate-300 hover:bg-[#059473] hover:text-white hover:-translate-y-1 flex justify-center items-center bg-white/10 rounded-full transition-all"
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />{" "}
                </a>
              </li>
              <li>
                <a
                  className="w-[40px] h-[40px] text-slate-300 hover:bg-[#059473] hover:text-white hover:-translate-y-1 flex justify-center items-center bg-white/10 rounded-full transition-all"
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[90%] flex flex-wrap justify-center items-center text-slate-400 mx-auto py-5 text-center">
        <span>Copiright @ 2024 All Rights Reserved </span>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] h-[110px] bottom-3 right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInfo ? "/card" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-green-500">
              <FaCartShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {card_product_count}
              </div>
            )}
          </div>

          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-green-500">
              <FaHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
