import React from "react";
import NavTitle from "./NavTitle";

const Price = () => {
  const priceList = [
    {
      _id: 950,
      priceOne: 0,
      priceTwo: 50000,
    },
    {
      _id: 951,
      priceOne: 50000,
      priceTwo: 100000,
    },
    {
      _id: 952,
      priceOne: 100000,
      priceTwo: 150000,
    },
    {
      _id: 953,
      priceOne: 150000,
      priceTwo: 200000,
    },
    {
      _id: 954,
      priceOne: 200000,
      priceTwo: 500000,
    },
    {
      _id: 955,
      priceOne: 500000,
      priceTwo: 10000000,
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
              {item.priceOne}đ - {item.priceTwo}đ
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
