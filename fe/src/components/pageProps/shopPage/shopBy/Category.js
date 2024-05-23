import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = ({setProductCategory}) => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      title: "Giày",
      icons: true,
    },
    {
      _id: 991,
      title: "Áo",
    },
    {
      _id: 992,
      title: "Quần",
      icons: true,
    },
    {
      _id: 993,
      title: "Mũ",
    },
    {
      _id: 994,
      title: "Cả set",
    },
  ];
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              value={title}
              onClick={() => {
                if (title === "Cả set") {
                  setProductCategory("");
                } else {
                  setProductCategory(title);
                }
              }}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
