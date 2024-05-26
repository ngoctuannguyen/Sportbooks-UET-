import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Product = (props, { isAdmin}) => {
  const { query } = props;
  const dispatch = useDispatch();
  const notify = () => toast.success("Thêm vào giỏ hàng thành công!");
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    console.log(isAdmin);
    console.log(props);
    console.log("productItem");
    if (props.isAdmin) {
      navigate(`/admin/product/${rootId}`, {
        state: {
          item: productItem,
        },
      });
    } else {
      navigate(`/product/${rootId}`, {
        state: {
          item: productItem,
        },
      });
    }
    // navigate(`/product/${rootId}`, {
    //   state: {
    //     item: productItem,
    //   },
    // });
  };

  function highlightMatches(text, query) {
    if (!text || !query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: yellow;">$1</mark>');
  }

  console.log("query", query);


  return (
    <div className="w-full relative group">
      <div className="max-w-80 h-80 relative overflow-y-hidden ">
        <div className="w-full h-full" onClick={handleProductDetails}>
          <Image className="w-full h-full object-cover" imgSrc={props.productImages} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        {isAdmin ? null : (
          <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">

            <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
              <li
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id: props._id,
                      name: props.productName,
                      quantity: 1,
                      image: props.productImages,
                      badge: props.badge,
                      price: props.price,
                      colors: props.color,
                      count: props.productCount,
                    })
                  );
                  notify();
                }}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                Add to Cart
                <span>
                  <FaShoppingCart />
                </span>
              </li>
              <li
                onClick={handleProductDetails}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                View Details
                <span className="text-lg">
                  <MdOutlineLabelImportant />
                </span>
              </li>
              {/* <li
              onClick={handleWishList}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li> */}
            </ul></div>)}
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 onClick={handleProductDetails} className="hover:cursor-pointer text-lg text-primeColor font-bold overflow-hidden whitespace-nowrap -webkit-line-clamp-2 overflow-ellipsis" dangerouslySetInnerHTML={{ __html: highlightMatches(props.productName, query) }}/>
          <p className="text-[#767676] text-[14px]">{props.price.toLocaleString()}đ</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.productStars}⭐</p>
        </div>
      </div>
    </div>
  );
};

export default Product;