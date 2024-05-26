import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { usePaginationItems } from "../../../constants";

const SpecialOffers = () => {
  const paginationItems = usePaginationItems();

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {paginationItems.map((item) => {
          return (
            <Product
              key={item._id}
              _id={item._id}
              img={item.productImages}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              pdf={item.pdf}
              productCount={item.productCount}
              productCategory={item.productCategory}
              productStars={item.productStars}
              productImages={item.productImages}
              productDesc={item.des}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpecialOffers;
