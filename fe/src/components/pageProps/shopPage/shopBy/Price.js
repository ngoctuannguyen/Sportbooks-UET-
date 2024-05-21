import React from "react";
import NavTitle from "./NavTitle";

const Price = () => {
  const priceList = [
    {
      _id: 950,
      priceOne: 0,
      priceTwo: 100,
    },
    {
      _id: 951,
      priceOne: 100,
      priceTwo: 200,
    },
    {
      _id: 952,
      priceOne: 200,
      priceTwo: 500,
    },
    {
      _id: 953,
      priceOne: 500,
      priceTwo: 1000,
    },
    {
      _id: 954,
      priceOne: 1000,
      priceTwo: 599.99,
    },
  ];
  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {item._id === 954 ? `> ${item.priceOne}k` : `${item.priceOne} - ${item.priceTwo}k`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
