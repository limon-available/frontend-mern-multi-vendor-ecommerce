import React from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const RatingTemp = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="shrink-0 text-[#Edbb0E]" />
        ) : (
          <CiStar key={i} className="shrink-0 text-[#Edbb0E]" />
        )
      )}
    </>
  );
};

export default RatingTemp;
