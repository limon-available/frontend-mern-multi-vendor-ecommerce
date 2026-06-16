import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Rating = ({ ratings }) => {
  const full = "shrink-0 text-[#EDBB0E]";
  const empty = "shrink-0 text-slate-600";

  return (
    <>
      {ratings >= 1 ? (
        <FaStar className={full} />
      ) : ratings >= 0.5 ? (
        <FaStarHalfAlt className={full} />
      ) : (
        <CiStar className={empty} />
      )}
      {ratings >= 2 ? (
        <FaStar className={full} />
      ) : ratings >= 1.5 ? (
        <FaStarHalfAlt className={full} />
      ) : (
        <CiStar className={empty} />
      )}
      {ratings >= 3 ? (
        <FaStar className={full} />
      ) : ratings >= 2.5 ? (
        <FaStarHalfAlt className={full} />
      ) : (
        <CiStar className={empty} />
      )}
      {ratings >= 4 ? (
        <FaStar className={full} />
      ) : ratings >= 3.5 ? (
        <FaStarHalfAlt className={full} />
      ) : (
        <CiStar className={empty} />
      )}
      {ratings >= 5 ? (
        <FaStar className={full} />
      ) : ratings >= 4.5 ? (
        <FaStarHalfAlt className={full} />
      ) : (
        <CiStar className={empty} />
      )}
    </>
  );
};

export default Rating;
