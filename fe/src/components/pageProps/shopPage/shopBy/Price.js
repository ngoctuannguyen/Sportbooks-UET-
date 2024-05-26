import React from "react";
import NavTitle from "./NavTitle";

const Price = ({ setMinPrice, setMaxPrice }) => {
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
      priceTwo: 10000,
    },
    {
      _id: 955,
      priceOne: 6000,
      priceTwo: 100000,
    }
  ];
  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map(({ _id, priceOne, priceTwo }) => (
            <li
              key={_id}
              value={_id}
              onClick={(e) => {
                if (e.target.value === 955) {
                  setMinPrice(null);
                  setMaxPrice(null)
                } else {
                setMinPrice(priceOne*1000);
                setMaxPrice(priceTwo*1000);
              }}}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {_id === 955 ? 'Tất cả' : (_id === 954 ? `> ${priceOne}k` : `${priceOne} - ${priceTwo}k`)}            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
