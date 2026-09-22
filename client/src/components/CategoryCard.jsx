import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, image }) => {
  return (
    <Link to={`/products?category=${encodeURIComponent(name)}`} className="flex flex-col items-center gap-3 cursor-pointer group shrink-0 w-24 sm:w-28">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EBDDBF]/70 flex items-center justify-center p-4 transition-all duration-300 ease-out group-hover:scale-[1.05] group-hover:shadow-md group-hover:-translate-y-1 group-hover:bg-[#EBDDBF]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 mix-blend-multiply brightness-105 contrast-125"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-white/50" />
        )}
      </div>
      <span className="text-center text-sm font-semibold text-[#2B1723] leading-tight transition-colors duration-300 group-hover:text-[#5A123E]">
        {name}
      </span>
    </Link>
  );
};

export default CategoryCard;
