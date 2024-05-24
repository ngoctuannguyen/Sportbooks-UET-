import React, { useState, useEffect } from 'react';
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../assets/images/index";

export const usePaginationItems = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const product_list = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/product_list`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const renamedData = data.map(item => ({
          _id: item.id,
          img: spfOne,
          productName: item.name,
          price: item.price,
          color: "Black",
          badge: true,
          des: item.desc,
          productCategory: item.category,
          productStars: item.stars,
          dateCreated: item.date_created,
          dateModified: item.date_modified,
          productCount: item.product_count
        }));
        setProductList(renamedData);
        // console.log(productList);
      } catch (error) {
        console.error(error);
      }
    };
    product_list();
  }, []);
  return productList;
};

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
  },
  {
    _id: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "Order",
    link: "/order",
  },
  {
    _id: 1004,
    title: "About",
    link: "/about",
  },
  {
    _id: 1005,
    title: "Contact",
    link: "contact",
  },
];

export const navBarListAdmin = [
  {
    _id: 1001,
    title: "Home",
    link: "/admin",
  },
  {
    _id: 1002,
    title: "Product",
    link: "/admin/product",
  },
  {
    _id: 1003,
    title: "Order",
    link: "/admin/order",
  },
  {
    _id: 1004,
    title: "Admin",
    link: "/admin/admin",
  },
  {
    _id: 1005,
    title: "About",
    link: "/admin/about",
  },
];

// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: newArrFour,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== Special Offer data End here ==============
