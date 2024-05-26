import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { usePaginationItems } from "../../../constants";
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
} from "../../../assets/images/index";

function Items({ currentItems, selectedBrands, selectedCategories, isAdmin }) {
  // Filter items based on selected brands and categories
  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === item.cat);

    return isBrandSelected && isCategorySelected;
  });

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item._id} className="w-full">
          <Product isAdmin = {isAdmin}
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
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, isAdmin, productName, productCategory, minPrice, maxPrice }) => {
  const paginationItems = usePaginationItems();
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  useEffect(() => {
    const product_search = async () => {
      console.log(paginationItems)
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/product_search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "product_search": {
            "name": productName,
            "category": productCategory,
            "min_price": minPrice,
            "max_price": maxPrice
          }}),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const itemIds= paginationItems.map(item => item._id);
        const filterData = data.filter(item => itemIds.includes(item.id));
        const reDefineData = filterData.map(item => ({
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
          productCount: item.product_count,
          productStars: item.stars,
          productImages: item.url
        }));
        reDefineData.forEach(item => {
          if (item.productCategory === "Giày") {
            item.img = spfOne;
          } else if (item.productCategory === "Áo") {
            item.img = spfTwo;
          } else if (item.productCategory === "Quần") {
            item.img = spfThree;
          } else if (item.productCategory === "Mũ") {
            item.img = spfFour;
          }
        });
        setItems(reDefineData);
      } catch (error) {
        console.error(error);
      }
    };
    product_search();
  }, [paginationItems, productName, productCategory, minPrice, maxPrice]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items isAdmin={isAdmin}
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
        />{" "}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;