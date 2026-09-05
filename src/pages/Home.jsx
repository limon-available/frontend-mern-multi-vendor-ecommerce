import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import SellerCta from "../components/SellerCta";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { products, latest_product, topRated_product, discount_product } =
    useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
  }, []);

  const perks = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
    { icon: "↩️", title: "Easy Returns", desc: "30-day money back" },
    { icon: "🔒", title: "Secure Payment", desc: "100% protected checkout" },
    { icon: "🎧", title: "24/7 Support", desc: "Dedicated assistance" },
  ];

  return (
    <div className="w-full">
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-3xl animate-blob"></div>
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-teal-200/30 blur-3xl animate-blob"></div>

        <div className="app-container relative z-10 py-14 md:py-10">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-10 items-center">
            {/* copy */}
            <div className="animate-fade-in-up">
              <span className="chip mb-5">
                <span className="w-2 h-2 rounded-full bg-[#059473]"></span>
                The 2026 Marketplace
              </span>
              <h1 className="text-5xl lg:text-4xl md:text-3xl font-bold font-display leading-[1.1] text-slate-900">
                Everything you love,
                <br />
                from sellers you{" "}
                <span className="brand-text-gradient">trust</span>.
              </h1>
              <p className="text-slate-500 text-lg md:text-base mt-5 max-w-lg">
                Shop millions of products from thousands of verified vendors —
                fast delivery, secure checkout, and prices you will love.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link to="/shops" className="btn btn-lg btn-primary">
                  Start Shopping
                </Link>
                <Link to="/shops" className="btn btn-lg btn-outline">
                  Browse Categories
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-8 mt-10">
                <div>
                  <p className="text-2xl font-bold text-slate-900">10k+</p>
                  <p className="text-sm text-slate-500">Products</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">500+</p>
                  <p className="text-sm text-slate-500">Verified Vendors</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.9★</p>
                  <p className="text-sm text-slate-500">Avg. Rating</p>
                </div>
              </div>
            </div>

            {/* decorative visual (CSS only) */}
            <div className="relative h-[360px] md-lg:hidden animate-scale-in">
              <div className="absolute inset-0 brand-gradient rounded-[2rem] rotate-3 opacity-90"></div>
              <div className="absolute inset-0 glass-panel rounded-[2rem] border border-white/60 shadow-soft flex items-center justify-center">
                <div className="grid grid-cols-2 gap-5 p-8 w-full">
                  {[
                    { icon: "🛍️", t: "Fashion", s: "12k+ items" },
                    { icon: "💻", t: "Electronics", s: "8k+ items" },
                    { icon: "🏠", t: "Home & Living", s: "6k+ items" },
                    { icon: "🎁", t: "Gifts", s: "4k+ items" },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={`ui-card ui-card-hover p-5 flex flex-col gap-2 ${
                        i % 2 ? "translate-y-5" : ""
                      }`}
                    >
                      <span className="text-3xl">{c.icon}</span>
                      <p className="font-bold text-slate-800 leading-tight">
                        {c.t}
                      </p>
                      <p className="text-xs text-slate-500">{c.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <SellerCta />

      {/* promo carousel */}
      <Banner />

      {/* Trust / perks strip */}
      <div className="w-[85%] lg:w-[90%] mx-auto -mt-2 mb-6">
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-white/80 glass-panel rounded-2xl shadow-card border border-emerald-50 p-5">
          {perks.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-emerald-50/70 transition-colors"
            >
              <span className="text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-emerald-50 shrink-0">
                {p.icon}
              </span>
              <div>
                <h4 className="font-bold text-slate-800 leading-tight">{p.title}</h4>
                <p className="text-xs text-slate-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Categorys />

      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>

      {/* Promo CTA band */}
      <div className="w-full py-12">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="relative overflow-hidden rounded-3xl brand-gradient shadow-soft px-10 py-12 md:px-6 md:py-8">
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full animate-blob"></div>
            <div className="absolute -bottom-16 -left-10 w-60 h-60 bg-emerald-300/20 rounded-full animate-blob"></div>
            <div className="relative z-10 flex md:flex-col md:gap-5 justify-between items-center text-white">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-widest uppercase mb-3">
                  Mega Sale
                </span>
                <h2 className="text-4xl md:text-2xl font-bold font-display leading-tight">
                  Discover thousands of products from trusted vendors
                </h2>
                <p className="text-white/80 mt-3">
                  Quality you can trust, prices you will love — all in one marketplace.
                </p>
              </div>
              <Link to="/shops" className="btn btn-lg btn-light whitespace-nowrap">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-gradient-to-b from-emerald-50/60 to-transparent">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
              <Products title="Latest Product" products={latest_product} />
            </div>

            <div className="overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
              <Products title="Top Rated Product" products={topRated_product} />
            </div>

            <div className="overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
              <Products title="Discount Product" products={discount_product} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
