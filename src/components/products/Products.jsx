import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Products = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
        <div className="text-xl font-bold text-slate-800 font-display"> {title} </div>
        <div className="flex justify-center items-center gap-2 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-[34px] h-[34px] rounded-full flex justify-center items-center bg-slate-100 hover:bg-[#059473] hover:text-white transition-all"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[34px] h-[34px] rounded-full flex justify-center items-center bg-slate-100 hover:bg-[#059473] hover:text-white transition-all"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div key={i} className="flex flex-col justify-start gap-2">
              {p.map((pl, j) => (
                <Link
                  key={j}
                  className="flex justify-start items-center p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                  to="#"
                >
                  <img
                    className="w-[110px] h-[110px] rounded-lg object-cover bg-slate-50"
                    src={pl.images[0]}
                    alt=""
                  />
                  <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                    <h2 className="font-medium text-slate-800 group-hover:text-[#059473] transition-colors">{pl.name} </h2>
                    <span className="text-lg font-bold text-[#059473]">${pl.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
