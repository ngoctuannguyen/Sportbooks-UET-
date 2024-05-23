import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({setProductCategory, setMinPrice, setMaxPrice }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category setProductCategory={setProductCategory} />
      <Price setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
    </div>
  );
};

export default ShopSideNav;
