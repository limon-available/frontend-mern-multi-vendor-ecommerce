import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_wishlist_products,
  remove_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlist, successMessage } = useSelector((state) => state.card);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(get_wishlist_products(userInfo._id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
      {wishlist.map((p, i) => (
        <div
          key={i}
          className="group bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5"
        >
          <div className="relative overflow-hidden bg-slate-50">
            {p.discount !== 0 && (
              <div className="flex justify-center items-center absolute z-10 text-white w-[42px] h-[42px] rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg font-bold text-xs left-3 top-3">
                {p.discount}%{" "}
              </div>
            )}

            <img className="sm:w-full w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105" src={p.image} alt="" />

            <ul className="flex transition-all duration-500 -bottom-12 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                onClick={() => dispatch(remove_wishlist(p._id))}
                className="w-[40px] h-[40px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full text-slate-600 hover:bg-[#059473] hover:text-white hover:scale-110 transition-all"
              >
                <FaRegHeart />
              </li>
              <Link
                to={`/product/details/${p.slug}`}
                className="w-[40px] h-[40px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full text-slate-600 hover:bg-[#059473] hover:text-white hover:scale-110 transition-all"
              >
                <FaEye />
              </Link>
              <li className="w-[40px] h-[40px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full text-slate-600 hover:bg-[#059473] hover:text-white hover:scale-110 transition-all">
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>

          <div className="py-4 text-slate-600 px-4">
            <h2 className="font-semibold text-slate-800 truncate">{p.name} </h2>
            <div className="flex justify-between items-center gap-3 mt-2">
              <span className="text-lg font-bold text-[#059473]">${p.price}</span>
              <div className="flex">
                <Rating ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
