import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  get_card_products,
  delete_card_product,
  messageClear,
  quantity_inc,
  quantity_dec,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";

const Card = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    card_products,
    successMessage,
    price,
    buy_product_item,
    shipping_fee,
    outofstock_products,
    card_cleared,
  } = useSelector((state) => state.card);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(get_card_products(userInfo._id));
    }
  }, [dispatch, userInfo, card_cleared]);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: 500,
        shipping_fee: 40,
        items: 2,
      },
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      if (userInfo?._id) {
        dispatch(get_card_products(userInfo?._id));
      }
    }
  }, [successMessage, dispatch, userInfo]);

  const inc = (quantity, stock, card_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(card_id));
    }
  };

  const dec = (quantity, card_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(card_id));
    }
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
              <h2 className="text-4xl font-bold font-display">Card Page </h2>
              <div className="flex justify-center items-center gap-2 text-xl w-full">
                <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span className="text-emerald-300">Card </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 rounded-xl shadow-card">
                      <h2 className="text-md text-[#059473] font-semibold">
                        Stock Products {card_products.length}
                      </h2>
                    </div>

                    {card_products.map((p, i) => (
                      <div className="flex bg-white p-4 rounded-xl shadow-card flex-col gap-2">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold">
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
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-100 rounded-lg h-[34px] justify-center items-center text-xl border border-slate-200">
                                  <div
                                    onClick={() => dec(pt.quantity, pt._id)}
                                    className="px-3 cursor-pointer"
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{pt.quantity}</div>
                                  <div
                                    onClick={() =>
                                      inc(
                                        pt.quantity,
                                        pt.productInfo.stock,
                                        pt._id,
                                      )
                                    }
                                    className="px-3 cursor-pointer"
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(delete_card_product(pt._id))
                                  }
                                  className="px-5 py-[5px] rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outofstock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4 rounded-xl shadow-card">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock {outofstock_products.length}
                          </h2>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-card">
                          {outofstock_products.map((p, i) => (
                            <div className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px] rounded-lg object-cover bg-slate-50 border border-slate-100"
                                    src={p.products[0].images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      {p.products[0].name}{" "}
                                    </h2>
                                    <span className="text-sm">
                                      Brand: {p.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    $
                                    {p.products[0].price -
                                      Math.floor(
                                        (p.products[0].price *
                                          p.products[0].discount) /
                                          100,
                                      )}
                                  </h2>
                                  <p className="line-through">
                                    ${p.products[0].price}
                                  </p>
                                  <p>-{p.products[0].discount}%</p>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-100 rounded-lg h-[34px] justify-center items-center text-xl border border-slate-200">
                                    <div
                                      onClick={() => dec(p.quantity, p._id)}
                                      className="px-3 cursor-pointer"
                                    >
                                      -
                                    </div>
                                    <div className="px-3">{p.quantity}</div>
                                    <div className="px-3 cursor-pointer">+</div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(delete_card_product(p._id))
                                    }
                                    className="px-5 py-[5px] rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white p-5 rounded-xl shadow-card text-slate-600 flex flex-col gap-3 sticky top-4">
                      <h2 className="text-xl font-bold text-slate-800 font-display border-b border-slate-100 pb-3">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>{buy_product_item} Items </span>
                        <span>${price} </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>${shipping_fee} </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 outline-0 focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 focus:bg-white transition-all rounded-lg"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] hover:bg-[#047857] text-white rounded-lg uppercase text-sm font-semibold transition-colors">
                          Apply
                        </button>
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                        <span className="font-semibold text-slate-800">Total</span>
                        <span className="text-xl font-bold text-[#059473]">
                          ${price + shipping_fee}{" "}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[10px] rounded-lg hover:shadow-emerald-500/40 hover:shadow-lg bg-gradient-to-r from-[#059473] to-[#047857] text-sm font-semibold text-white uppercase transition-all"
                      >
                        Process to Checkout ({buy_product_item})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-2xl shadow-card py-20">
              <h2 className="text-2xl font-bold text-slate-800 font-display">
                Your cart is empty
              </h2>
              <p className="text-slate-500">
                Looks like you haven't added anything yet.
              </p>
              <Link
                className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-[#059473] to-[#047857] hover:shadow-lg hover:shadow-emerald-500/40 text-white font-semibold transition-all"
                to="/shops"
              >
                {" "}
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Card;
