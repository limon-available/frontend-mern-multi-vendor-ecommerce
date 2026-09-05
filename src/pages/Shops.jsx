import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProducts from "../components/products/ShopProducts";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_price_range, query_products } from "../store/reducers/homeReducer";

const Shops = () => {
  const dispatch = useDispatch();
  const {
    products,
    categorys,
    priceRange,
    latest_product,
    totalProduct,
    parPage,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_price_range());
  }, []);

  const [state, setState] = useState({
    values: [0, 0],
  });
  useEffect(() => {
    if (priceRange.low !== undefined && priceRange.high !== undefined) {
      setState({
        values: [priceRange.low, priceRange.high],
      });
    }
  }, [priceRange]);

  const [filter, setFilter] = useState(true);

  const [rating, setRating] = useState(0);
  const [styles, setStyles] = useState("grid");

  const [pageNumber, setPageNumber] = useState(1);

  const [sortPrice, setSortPrice] = useState("");
  const [category, setCategory] = useState("");
  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category,
        rating,
        sortPrice,
        pageNumber,
      }),
    );
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    sortPrice,
    pageNumber,
  ]);

  const resetRating = () => {
    setRating(0);
    setPageNumber(1);
  };

  return (
    <div>
      <Header />
      <section
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dnjrmakcu/image/upload/v1777445425/shop_gs5xsy.png")`,
        }}
        className="h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
      >
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-[#059473]/50">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-4xl font-bold font-display">Shop Page </h2>
              <div className="flex justify-center items-center gap-2 text-xl w-full">
                <Link
                  to="/"
                  className="hover:text-emerald-300 transition-colors"
                >
                  Home
                </Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span className="text-emerald-300">Shop </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={` md:block hidden ${!filter ? "mb-6" : "mb-0"} `}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2.5 px-3 rounded-lg font-semibold bg-gradient-to-r from-[#059473] to-[#047857] text-white shadow-sm hover:shadow-lg transition-all"
            >
              Filter Product
            </button>
          </div>

          <div className="w-full flex ">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 
  ${filter ? "md:hidden" : "md:block"} `}
            >
              <h2 className="text-xl font-bold mb-3 text-slate-800 font-display">
                Category{" "}
              </h2>
              <div className="py-2">
                {categorys.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-start items-center gap-2 py-1"
                  >
                    <input
                      checked={category === c.name ? true : false}
                      onChange={(e) => queryCategory(e, c.name)}
                      type="checkbox"
                      id={c.name}
                    />
                    <label
                      className="text-slate-600 block cursor-pointer"
                      htmlFor={c.name}
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="py-2 flex flex-col gap-5">
                <h2 className="text-xl font-bold mb-3 text-slate-800 font-display">
                  Price
                </h2>

                {priceRange.low !== undefined &&
                  priceRange.high !== undefined &&
                  priceRange.high > priceRange.low && (
                    <>
                      <Range
                        step={5}
                        min={priceRange.low}
                        max={priceRange.high}
                        values={[
                          Math.min(
                            Math.max(state.values[0], priceRange.low),
                            priceRange.high,
                          ),
                          Math.min(
                            Math.max(state.values[1], priceRange.low),
                            priceRange.high,
                          ),
                        ]}
                        onChange={(values) => setState({ values })}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                          >
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => {
                          const { key, ...rest } = props;
                          return (
                            <div
                              key={key}
                              className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                              {...rest}
                            />
                          );
                        }}
                      />

                      <div>
                        <span className="text-slate-800 font-bold text-lg">
                          ${Math.floor(state.values[0])} - $
                          {Math.floor(state.values[1])}
                        </span>
                      </div>
                    </>
                  )}
                <div></div>
              </div>

              <div className="py-3 flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-3 text-slate-800 font-display">
                  Rating{" "}
                </h2>

                <div className="flex flex-col gap-3 w-full">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <div
                      key={r}
                      onClick={() => setRating(r)}
                      className="flex flex-row items-center gap-2 text-xl cursor-pointer hover:text-red-400 transition"
                    >
                      {[...Array(5)].map((_, i) =>
                        i < r ? (
                          <AiFillStar
                            key={i}
                            className={`shrink-0 ${
                              rating === r ? "text-red-500" : "text-orange-500"
                            }`}
                          />
                        ) : (
                          <CiStar
                            key={i}
                            className="shrink-0 text-orange-500"
                          />
                        ),
                      )}
                    </div>
                  ))}

                  {/* reset */}
                  <div
                    onClick={resetRating}
                    className="flex flex-row items-center gap-2 text-xl cursor-pointer text-orange-500"
                  >
                    {[...Array(5)].map((_, i) => (
                      <CiStar key={i} className="shrink-0" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-5 flex flex-col gap-4 md:hidden">
                <Products title="Latest Product" products={latest_product} />
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-4 rounded-xl shadow-card flex justify-between items-center border border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {" "}
                    ({totalProduct}) Products{" "}
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="p-2 border border-slate-200 rounded-lg outline-0 text-slate-600 font-semibold focus:border-[#059473] focus:ring-2 focus:ring-emerald-100 transition-all"
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price </option>
                    </select>
                    <div className="flex justify-center items-start gap-2 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2.5 ${styles === "grid" ? "bg-[#059473] text-white" : "bg-slate-100 text-slate-600"} hover:bg-[#059473] hover:text-white cursor-pointer rounded-lg transition-all `}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2.5 ${styles === "list" ? "bg-[#059473] text-white" : "bg-slate-100 text-slate-600"} hover:bg-[#059473] hover:text-white cursor-pointer rounded-lg transition-all `}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-8">
                  <ShopProducts products={products} styles={styles} />
                </div>

                <div>
                  {totalProduct > parPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      parPage={parPage}
                      showItem={5}
                    />
                  )}
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

export default Shops;
