import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";

const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-[87%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl text-slate-800 font-bold relative pb-[35px]">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#059473] mb-2">
            Browse
          </span>
          <h2 className="font-display">Top Category</h2>
          <div className="w-[90px] h-[3px] bg-gradient-to-r from-[#059473] to-emerald-400 rounded-full mt-4"></div>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys.map((c, i) => (
          <Link
            className="h-[185px] block mx-2 group"
            key={i}
            to={`/products?category=${c.name}`}
          >
            <div className="w-full h-full relative rounded-xl overflow-hidden shadow-card transition-all duration-300 group-hover:shadow-card-hover">
              <img
                src={c.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="py-1.5 px-5 rounded-full bg-white/95 text-slate-800 text-sm shadow-md backdrop-blur-sm transition-colors group-hover:bg-[#059473] group-hover:text-white">
                  {c.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
