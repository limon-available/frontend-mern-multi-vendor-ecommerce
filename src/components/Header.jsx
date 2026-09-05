import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaList,
  FaUser,
  FaPhoneAlt,
  FaRegHeart,
  FaFacebookF,
  FaLinkedin,
  FaGithub,
  FaTimes,
} from "react-icons/fa";
import { FaTwitter, FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
import { SOCIAL_LINKS } from "../config/socialLinks";

const LANGUAGES = [
  { code: "en", label: "English", flag: "/images/language.png" },
  { code: "bn", label: "Bengali", flag: "/images/language.png" },
];

const CURRENCIES = [
  { code: "usd", label: "USD", symbol: "$" },
  { code: "eur", label: "EUR", symbol: "€" },
  { code: "bdt", label: "BDT", symbol: "৳" },
];

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shops", label: "Shop" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count, card_cleared } = useSelector(
    (state) => state.card,
  );
  const { pathname } = useLocation();

  const [showShidebar, setShowShidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en",
  );
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "usd",
  );

  const selectLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem("language", code);
  };

  const selectCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem("currency", code);
  };

  const currentLanguage =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const currentCurrency =
    CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const search = () => {
    navigate(`/products/search?category=${category}&value=${searchValue}`);
  };

  const redirect_card_page = () => {
    if (userInfo) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo._id));
      dispatch(get_wishlist_products(userInfo._id));
    }
  }, [userInfo, card_cleared]);

  /* ---------- Reusable pieces ---------- */

  // The search field (shared by desktop + mobile). Defined as an inline render
  // function (not a nested component) so the uncontrolled input is never
  // remounted on re-render and keeps focus while typing. `compact` tweaks sizing.
  const searchBar = (compact = false) => (
    <div
      className={`flex items-stretch w-full ${
        compact ? "h-[46px]" : "h-[52px]"
      } bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all focus-within:border-[#059473] focus-within:ring-2 focus-within:ring-emerald-100`}
    >
      {!compact && (
        <div className="relative shrink-0 hidden sm:block after:absolute after:top-1/2 after:-translate-y-1/2 after:h-[26px] after:w-px after:bg-slate-200 after:right-0">
          <select
            onChange={(e) => {
              const value = e.target.value;
              setCategory(value);
              navigate(`/products?category=${value}`);
            }}
            className="h-full w-[150px] bg-transparent text-slate-600 font-semibold px-4 outline-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categorys.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <input
        className="flex-1 min-w-0 bg-transparent text-slate-700 placeholder-slate-400 outline-none px-4"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && search()}
        type="text"
        placeholder="Search for products, brands and more…"
      />

      <button
        onClick={search}
        className="shrink-0 flex items-center gap-2 px-5 sm:px-7 bg-gradient-to-r from-[#059473] to-[#047857] text-white font-semibold hover:from-[#047857] hover:to-[#065f46] transition-all"
        aria-label="Search"
      >
        <FaMagnifyingGlass />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );

  return (
    <header className="w-full">
      {/* ===================== TOP UTILITY BAR ===================== */}
      <div className="bg-slate-900 text-slate-300 text-[13px] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex justify-between items-center h-[42px]">
            {/* contact */}
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-2">
                <MdEmail className="text-emerald-400" />
                <span>support@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 lg:hidden">
                <IoMdPhonePortrait className="text-emerald-400" />
                <span>+(123) 3243 343</span>
              </li>
            </ul>

            {/* promo */}
            <p className="hidden xl:block font-medium tracking-wide text-slate-200">
              <span className="text-emerald-400">✦</span> Free shipping on
              orders over $50
            </p>

            {/* prefs + social */}
            <div className="flex items-center gap-5">
              {/* Language */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <img
                    src={currentLanguage.flag}
                    alt={currentLanguage.label}
                    className="w-4 h-4 object-contain"
                  />
                  <span>{currentLanguage.label}</span>
                  <MdKeyboardArrowDown />
                </button>
                <ul className="absolute right-0 top-full pt-2 w-[140px] invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white rounded-lg shadow-soft border border-slate-100 py-1 overflow-hidden">
                    {LANGUAGES.map((l) => (
                      <li
                        key={l.code}
                        onClick={() => selectLanguage(l.code)}
                        className={`px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-[#059473] cursor-pointer ${
                          language === l.code
                            ? "text-[#059473] font-semibold bg-emerald-50/60"
                            : ""
                        }`}
                      >
                        {l.label}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>

              {/* Currency */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="font-semibold text-emerald-400">
                    {currentCurrency.symbol}
                  </span>
                  <span>{currentCurrency.label}</span>
                  <MdKeyboardArrowDown />
                </button>
                <ul className="absolute right-0 top-full pt-2 w-[120px] invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white rounded-lg shadow-soft border border-slate-100 py-1 overflow-hidden">
                    {CURRENCIES.map((c) => (
                      <li
                        key={c.code}
                        onClick={() => selectCurrency(c.code)}
                        className={`px-4 py-2 text-slate-600 hover:bg-emerald-50 hover:text-[#059473] cursor-pointer flex items-center gap-2 ${
                          currency === c.code
                            ? "text-[#059473] font-semibold bg-emerald-50/60"
                            : ""
                        }`}
                      >
                        <span className="w-3">{c.symbol}</span>
                        {c.label}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>

              <div className="h-4 w-px bg-slate-700" />

              {/* Social */}
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== STICKY CLUSTER (main + nav) ===================== */}
      <div className="sticky top-0 z-40 bg-white/90 glass-panel border-b border-slate-100 shadow-[0_4px_20px_-12px_rgba(15,23,42,0.25)]">
        {/* ---------- MAIN BAR ---------- */}
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex items-center gap-6 lg:gap-4 py-3.5">
            {/* hamburger (mobile) + logo */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowShidebar(false)}
                className="hidden md-lg:flex w-[42px] h-[42px] items-center justify-center rounded-xl bg-emerald-50 text-[#059473] hover:bg-[#059473] hover:text-white transition-all"
                aria-label="Open menu"
              >
                <FaList />
              </button>
              <Link to="/" className="block">
                <img
                  src="/images/logo.png"
                  alt="Easy Shop"
                  className="h-[46px] md:h-[40px] w-auto object-contain"
                />
              </Link>
            </div>

            {/* search (desktop) */}
            <div className="flex-1 md-lg:hidden">{searchBar()}</div>

            {/* actions */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-auto">
              {/* Wishlist */}
              <button
                onClick={() =>
                  navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
                }
                className="group relative flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <span className="relative">
                  <span className="flex w-[42px] h-[42px] items-center justify-center rounded-full bg-emerald-50 text-[#059473] text-lg group-hover:bg-[#059473] group-hover:text-white transition-all">
                    <FaRegHeart />
                  </span>
                  {wishlist_count !== 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-rose-500 rounded-full text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                      {wishlist_count}
                    </span>
                  )}
                </span>
                <span className="hidden xl:block text-left leading-tight">
                  <span className="block text-[11px] text-slate-400">
                    Saved
                  </span>
                  <span className="block text-sm font-bold text-slate-700">
                    Wishlist
                  </span>
                </span>
              </button>

              {/* Cart */}
              <button
                onClick={redirect_card_page}
                className="group relative flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <span className="relative">
                  <span className="flex w-[42px] h-[42px] items-center justify-center rounded-full bg-emerald-50 text-[#059473] text-lg group-hover:bg-[#059473] group-hover:text-white transition-all">
                    <FaCartShopping />
                  </span>
                  {card_product_count !== 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-rose-500 rounded-full text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                      {card_product_count}
                    </span>
                  )}
                </span>
                <span className="hidden xl:block text-left leading-tight">
                  <span className="block text-[11px] text-slate-400">Cart</span>
                  <span className="block text-sm font-bold text-slate-700">
                    My Cart
                  </span>
                </span>
              </button>

              {/* Account (desktop dropdown) */}
              <div className="relative group md-lg:hidden">
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors">
                  <span className="flex w-[42px] h-[42px] items-center justify-center rounded-full bg-gradient-to-br from-[#059473] to-[#047857] text-white">
                    <FaUser />
                  </span>
                  <span className="hidden lg:block text-left leading-tight">
                    <span className="block text-[11px] text-slate-400">
                      Hello, {userInfo ? userInfo.name?.split(" ")[0] : "Guest"}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-slate-700">
                      Account <MdKeyboardArrowDown />
                    </span>
                  </span>
                </button>

                {/* dropdown */}
                <div className="absolute right-0 top-full pt-3 w-[230px] invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden">
                    {userInfo ? (
                      <>
                        <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-white border-b border-slate-100">
                          <p className="text-xs text-slate-400">Signed in as</p>
                          <p className="text-sm font-bold text-slate-800 truncate">
                            {userInfo.name}
                          </p>
                        </div>
                        <ul className="py-1 text-sm text-slate-600">
                          <li>
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#059473] transition-colors"
                            >
                              My Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/my-orders"
                              className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#059473] transition-colors"
                            >
                              My Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/my-wishlist"
                              className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#059473] transition-colors"
                            >
                              My Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/chat"
                              className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#059473] transition-colors"
                            >
                              Messages
                            </Link>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <div className="p-4 flex flex-col gap-2">
                        <Link
                          to="/login"
                          className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#059473] to-[#047857] text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="w-full text-center py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:border-[#059473] hover:text-[#059473] transition-all"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* search (mobile) */}
          <div className="hidden md-lg:block pb-3.5">{searchBar(true)}</div>
        </div>

        {/* ---------- NAV BAR (desktop) ---------- */}
        <div className="md-lg:hidden border-t border-slate-100 bg-white/70">
          <div className="w-[85%] lg:w-[90%] mx-auto">
            <div className="flex items-center justify-between h-[54px]">
              <div className="flex items-center gap-6">
                {/* All Categories dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setCategoryShow(!categoryShow)}
                    className="flex items-center gap-3 h-[40px] px-5 rounded-lg bg-gradient-to-r from-[#059473] to-[#047857] text-white font-bold text-sm shadow-sm hover:shadow-md hover:shadow-emerald-500/30 transition-all"
                  >
                    <FaList />
                    <span>All Categories</span>
                    <IoIosArrowDown
                      className={`transition-transform duration-300 ${
                        categoryShow ? "" : "rotate-180"
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full mt-2 w-[280px] bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden z-[99999] origin-top transition-all duration-300 ${
                      categoryShow
                        ? "opacity-0 invisible -translate-y-2"
                        : "opacity-100 visible translate-y-0"
                    }`}
                  >
                    <ul className="py-2 max-h-[420px] overflow-y-auto">
                      {categorys.map((c, i) => (
                        <li key={i}>
                          <Link
                            to={`/products?category=${c.name}`}
                            onClick={() => setCategoryShow(true)}
                            className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-[#059473] transition-colors"
                          >
                            <img
                              src={c.image}
                              className="w-[34px] h-[34px] rounded-full object-cover border border-slate-100"
                              alt=""
                            />
                            <span className="font-medium">{c.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* primary nav */}
                <nav>
                  <ul className="flex items-center gap-1 text-sm font-semibold">
                    {NAV_LINKS.map((l) => {
                      const active = pathname === l.to;
                      return (
                        <li key={l.to}>
                          <Link
                            to={l.to}
                            className={`relative px-4 py-2 block rounded-lg transition-colors ${
                              active
                                ? "text-[#059473]"
                                : "text-slate-600 hover:text-[#059473] hover:bg-emerald-50"
                            }`}
                          >
                            {l.label}
                            <span
                              className={`absolute left-4 right-4 -bottom-[1px] h-[2px] rounded-full bg-[#059473] transition-all ${
                                active ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              {/* support */}
              <div className="flex items-center gap-3">
                <span className="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-emerald-50 text-[#059473]">
                  <FaPhoneAlt />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-slate-800">
                    +1343-43233455
                  </p>
                  <p className="text-xs text-slate-400">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE DRAWER ===================== */}
      <div className="hidden md-lg:block">
        {/* overlay */}
        <div
          onClick={() => setShowShidebar(true)}
          className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-all duration-300 ${
            showShidebar ? "invisible opacity-0" : "visible opacity-100"
          }`}
        />

        {/* panel */}
        <div
          className={`fixed top-0 z-[70] w-[300px] sm:w-[86%] h-screen bg-white shadow-2xl overflow-y-auto transition-all duration-300 ${
            showShidebar ? "-left-[320px]" : "left-0"
          }`}
        >
          {/* drawer header */}
          <div className="flex items-center justify-between px-6 h-[70px] border-b border-slate-100 brand-gradient">
            <Link to="/" onClick={() => setShowShidebar(true)}>
              <img
                src="/images/logo.png"
                alt="Easy Shop"
                className="h-[40px] w-auto object-contain brightness-0 invert"
              />
            </Link>
            <button
              onClick={() => setShowShidebar(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {/* account */}
            {userInfo ? (
              <Link
                to="/dashboard"
                onClick={() => setShowShidebar(true)}
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50"
              >
                <span className="flex w-11 h-11 items-center justify-center rounded-full bg-gradient-to-br from-[#059473] to-[#047857] text-white">
                  <FaUser />
                </span>
                <div className="leading-tight">
                  <p className="text-xs text-slate-500">Welcome back</p>
                  <p className="text-sm font-bold text-slate-800">
                    {userInfo.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setShowShidebar(true)}
                  className="text-center py-2.5 rounded-lg bg-gradient-to-r from-[#059473] to-[#047857] text-white font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowShidebar(true)}
                  className="text-center py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold"
                >
                  Register
                </Link>
              </div>
            )}

            {/* nav */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Menu
              </p>
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setShowShidebar(true)}
                      className={`block py-2.5 px-3 rounded-lg font-semibold transition-colors ${
                        pathname === l.to
                          ? "bg-emerald-50 text-[#059473]"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* categories */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Categories
              </p>
              <ul className="flex flex-col gap-1 max-h-[260px] overflow-y-auto pr-1">
                {categorys.map((c, i) => (
                  <li key={i}>
                    <Link
                      to={`/products?category=${c.name}`}
                      onClick={() => setShowShidebar(true)}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-slate-600 hover:bg-emerald-50 hover:text-[#059473] transition-colors"
                    >
                      <img
                        src={c.image}
                        className="w-8 h-8 rounded-full object-cover border border-slate-100"
                        alt=""
                      />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* preferences */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Language
                </p>
                <div className="flex flex-col gap-1">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => selectLanguage(l.code)}
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        language === l.code
                          ? "bg-emerald-50 text-[#059473] font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Currency
                </p>
                <div className="flex flex-col gap-1">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => selectCurrency(c.code)}
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        currency === c.code
                          ? "bg-emerald-50 text-[#059473] font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {c.symbol} {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* contact + social */}
            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex w-11 h-11 items-center justify-center rounded-full bg-emerald-50 text-[#059473]">
                  <FaPhoneAlt />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-slate-800">+134343455</p>
                  <p className="text-xs text-slate-400">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <MdEmail className="text-[#059473]" />
                <span>support@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { href: SOCIAL_LINKS.facebook, icon: <FaFacebookF /> },
                  { href: SOCIAL_LINKS.twitter, icon: <FaTwitter /> },
                  { href: SOCIAL_LINKS.linkedin, icon: <FaLinkedin /> },
                  { href: SOCIAL_LINKS.github, icon: <FaGithub /> },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#059473] hover:text-white transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
