import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaShippingFast, FaHeadset, FaLock, FaTags } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      desc: "Reliable shipping from thousands of trusted vendors straight to your door.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our dedicated support team is always ready to help you with any question.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      desc: "Your transactions are protected with industry standard encryption.",
    },
    {
      icon: <FaTags />,
      title: "Best Prices",
      desc: "Compare offers across many shops to always get the best deal.",
    },
  ];

  return (
    <div>
      <Header />
      <section className="bg-gradient-to-r from-slate-900 via-[#065f46] to-[#059473] h-[220px] mt-6 relative">
        <div className="absolute left-0 top-0 w-full h-full bg-black/20">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-4xl font-bold font-display">About Us</h2>
              <div className="flex justify-center items-center gap-2 text-xl w-full">
                <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span className="text-emerald-300">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto">
          <div className="flex flex-wrap items-center gap-8">
            <div className="w-full md:w-full">
              <h2 className="text-3xl font-bold text-slate-700 mb-4">
                Welcome to Our Marketplace
              </h2>
              <p className="text-slate-600 leading-7 mb-4">
                We are a multi-vendor ecommerce platform that connects buyers
                with thousands of independent sellers from around the world. Our
                mission is to make online shopping simple, secure and enjoyable
                while giving small businesses a place to grow.
              </p>
              <p className="text-slate-600 leading-7">
                From everyday essentials to unique handcrafted goods, you can
                discover a wide range of products at competitive prices. Every
                vendor on our platform is verified so you can shop with
                confidence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 md-lg:grid-cols-2 sm:grid-cols-1 gap-6 mt-12">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 shadow-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
              >
                <span className="text-3xl text-[#059473] bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center">{f.icon}</span>
                <h3 className="font-bold text-lg text-slate-800">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
