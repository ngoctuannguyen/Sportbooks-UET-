import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { usePaginationItems } from "../../../constants";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const paginationItems = usePaginationItems();
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {paginationItems.map((item) => {
          return (
            <div className="px-2">
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
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default NewArrivals;
