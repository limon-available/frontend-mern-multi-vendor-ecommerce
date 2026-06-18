import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const inputHandle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <Header />
      <section className="bg-[#059473] h-[220px] mt-6 relative">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto">
          <div className="flex flex-wrap gap-8">
            <div className="w-4/12 md-lg:w-full">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-slate-700">
                  Get In Touch
                </h2>
                <div className="flex items-start gap-3">
                  <span className="text-2xl text-[#059473] mt-1">
                    <MdLocationOn />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-700">Address</h3>
                    <p className="text-slate-600 text-sm">
                      2504 Ivins Avenue, Egg Harbor Township, NJ 08234
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl text-[#059473] mt-1">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-700">Phone</h3>
                    <p className="text-slate-600 text-sm">+(123) 3243 343</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl text-[#059473] mt-1">
                    <MdEmail />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-700">Email</h3>
                    <p className="text-slate-600 text-sm">support@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-7/12 md-lg:w-full">
              <form onSubmit={submit} className="flex flex-col gap-4">
                {submitted && (
                  <div className="bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded">
                    Thank you! Your message has been sent.
                  </div>
                )}
                <div className="flex md-lg:flex-col gap-4">
                  <input
                    value={form.name}
                    onChange={inputHandle}
                    name="name"
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full border px-3 py-2 outline-0 focus:border-[#059473] rounded"
                  />
                  <input
                    value={form.email}
                    onChange={inputHandle}
                    name="email"
                    required
                    type="email"
                    placeholder="Your Email"
                    className="w-full border px-3 py-2 outline-0 focus:border-[#059473] rounded"
                  />
                </div>
                <input
                  value={form.subject}
                  onChange={inputHandle}
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="w-full border px-3 py-2 outline-0 focus:border-[#059473] rounded"
                />
                <textarea
                  value={form.message}
                  onChange={inputHandle}
                  name="message"
                  required
                  rows="6"
                  placeholder="Your Message"
                  className="w-full border px-3 py-2 outline-0 focus:border-[#059473] rounded"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#059473] text-white uppercase font-bold px-8 py-3 rounded self-start hover:bg-[#047a5f] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
