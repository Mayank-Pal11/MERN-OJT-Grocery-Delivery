import React from 'react';

const CategoryCard = ({ name, image }) => {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group shrink-0 w-24 sm:w-28">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EBDDBF] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ease-out group-hover:scale-[1.05] group-hover:shadow-lg group-hover:-translate-y-1">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-white/50" />
        )}
      </div>
      <span className="text-center text-sm font-semibold text-[#2B1723] leading-tight">
        {name}
      </span>
    </div>
  );
};

export default CategoryCard;
