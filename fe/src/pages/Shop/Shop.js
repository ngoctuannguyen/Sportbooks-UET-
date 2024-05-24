import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = ({isAdmin}) => {
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav setProductCategory={setProductCategory} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          
        <div className="w-full flex">
              <input value={productName} onChange={(e) => setProductName(e.target.value)} className="w-4/5 h-10 border-2 border-gray-300 rounded-md px-2" type="text" placeholder="Search for products..." />
              <button className="w-1/5 h-10 bg-primeColor text-white rounded-md">Search</button>
            </div>
          {isAdmin ? <Pagination isAdmin itemsPerPage={itemsPerPage} productName={productName} productCategory={productCategory} minPrice={minPrice} maxPrice={maxPrice} /> : <Pagination itemsPerPage={itemsPerPage} productName={productName} productCategory={productCategory} minPrice={minPrice} maxPrice={maxPrice} />}
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;