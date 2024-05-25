import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
  updateItemQuantity,
} from "../../redux/orebiSlice";

const ItemCard = ({ item, updateTotalAmt }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const updateTotalPrice = (newQuantity) => {
    const parsedQuantity = parseInt(newQuantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) return;
    if (parsedQuantity > item.count) {
      toast.error('Vượt quá số lượng hàng trong kho.\n Số lượng tối đa được thêm là: ' + item.count);
    } else {
      setQuantity(parsedQuantity);
      dispatch(updateItemQuantity({ id: item._id, quantity: parsedQuantity }));
    }
  };
  useEffect(() => {
    updateTotalAmt();
  }, [quantity]);
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(deleteItem(item._id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.image} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {item.price}đ
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <input
            type="number"
            value={quantity}
            onChange={(e) => updateTotalPrice(parseInt(e.target.value))}
            className="w-20 h-8 text-center border-[1px] border-gray-400 rounded-md"
            min={0}
          />
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>{(quantity * item.price).toLocaleString()}đ</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
