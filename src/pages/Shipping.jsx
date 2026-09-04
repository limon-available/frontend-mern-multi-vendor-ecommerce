import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";

const Shipping = () => {
  const location = useLocation();
  const {
    products = [],
    price = 0,
    shipping_fee = 0,
    items = 0,
  } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [res, setRes] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo._id,
        navigate,
      }),
    );
  };

  return (
    <div>
      <Header />
      <section
        className="h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
        style={{ backgroundImage: 'url("/images/banner/shop.png")' }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-[#059473]/50">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-4xl font-bold font-display">Shipping Page </h2>
              <div className="flex justify-center items-center gap-2 text-xl w-full">
                <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span className="text-emerald-300">Shipping </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-card rounded-xl">
                  <h2 className="text-slate-800 font-bold pb-3 text-lg font-display border-b border-slate-100 mb-3">
                    Shipping Information{" "}
                  </h2>

                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name"> Name </label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="name"
                              id="name"
                              placeholder="Name"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address"> Address </label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="address"
                              id="address"
                              placeholder="Address"
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone"> Phone </label>
                            <input
                              onChange={inputHandle}
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post"> Post </label>
                            <input
                              onChange={inputHandle}
                              value={state.post}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="post"
                              id="post"
                              placeholder="Post"
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province"> Province </label>
                            <input
                              onChange={inputHandle}
                              value={state.province}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="province"
                              id="province"
                              placeholder="Province"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city"> City </label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="city"
                              id="city"
                              placeholder="City"
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area"> Area </label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              type="text"
                              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50 outline-none focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                              name="area"
                              id="area"
                              placeholder="Area"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
                            <button className="px-3 py-2.5 rounded-lg font-semibold hover:shadow-green-500/40 hover:shadow-lg bg-gradient-to-r from-[#059473] to-[#047857] text-white transition-all">
                              Save Change{" "}
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Deliver To {state.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                          Home
                        </span>
                        <span>
                          {state.phone} {state.address} {state.province}{" "}
                          {state.city} {state.area}{" "}
                        </span>

                        <span
                          onClick={() => setRes(false)}
                          className="text-indigo-500 cursor-pointer"
                        >
                          Change{" "}
                        </span>
                      </p>

                      <p className="text-slate-600 text-sm">
                        Email To ariyan@gmail.com
                      </p>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div key={i} className="flex bg-white p-4 rounded-xl shadow-card flex-col gap-2">
                    <div className="flex justify-start items-center">
                      <h2 className="text-md text-slate-800 font-bold">
                        {p.shopName}
                      </h2>
                    </div>

                    {p.products.map((pt, i) => (
                      <div className="w-full flex flex-wrap">
                        <div className="flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px] rounded-lg object-cover bg-slate-50 border border-slate-100"
                              src={pt.productInfo.images[0]}
                              alt=""
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md font-semibold">
                                {pt.productInfo.name}{" "}
                              </h2>
                              <span className="text-sm">
                                Brand: {pt.productInfo.brand}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                          <div className="pl-4 sm:pl-0">
                            <h2 className="text-lg text-orange-500">
                              $
                              {pt.productInfo.price -
                                Math.floor(
                                  (pt.productInfo.price *
                                    pt.productInfo.discount) /
                                    100,
                                )}
                            </h2>
                            <p className="line-through">
                              ${pt.productInfo.price}
                            </p>
                            <p>-{pt.productInfo.discount}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white p-5 rounded-xl shadow-card text-slate-600 flex flex-col gap-3 sticky top-4">
                  <h2 className="text-xl font-bold text-slate-800 font-display border-b border-slate-100 pb-3">Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>Items Total (items) </span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee </span>
                    <span>${shipping_fee} </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total Payment </span>
                    <span>${price + shipping_fee} </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-lg text-[#059473]">
                      ${price + shipping_fee}{" "}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[10px] rounded-lg font-semibold hover:shadow-lg transition-all ${res ? "bg-gradient-to-r from-[#059473] to-[#047857] hover:shadow-emerald-500/40" : "bg-slate-300 cursor-not-allowed"}  text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
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

export default Shipping;
