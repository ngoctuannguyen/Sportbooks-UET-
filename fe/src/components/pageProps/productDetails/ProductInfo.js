import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";
import { updateItemQuantity } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo, onSave, isAdmin, onDelete }) => {
  const [quantity, setQuantity] = useState(1);
  const notify = () => toast.success("Thêm vào giỏ hàng thành công!");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductInfo, setEditedProductInfo] = useState(productInfo);
  const [initialProductInfo, setInitialProductInfo] = useState(productInfo); // Thêm state mới để lưu trữ thông tin ban đầu
  const [enStock, setEnStock] = useState(true);
  const highlightStyle = {
    color: "#d0121a",
    fontWeight: "bold",
  };
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(productInfo);
    setInitialProductInfo(productInfo);
  }, [productInfo]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProductInfo(initialProductInfo);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(editedProductInfo);
  };

  const updateQuantity = (newQuantity) => {
    const parsedQuantity = parseInt(newQuantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) return;
    if (parsedQuantity > productInfo.productCount) {
      toast.error('Vượt quá số lượng hàng trong kho.\n Số lượng tối đa được thêm là: ' + productInfo.productCount);
    } else {
      setQuantity(parsedQuantity);
      dispatch(updateItemQuantity({ id: productInfo._id, quantity: parsedQuantity }));
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value.replace(/,/g, ''),
    }));
  };

  const handleEnStockChange = () => {
    setEnStock(!enStock);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const renderDescription = () => {
    if (!productInfo.des) {
      return null;
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };

  console.log(productInfo);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">
        {isEditing ? (
          <input
            type="text"
            name="productName"
            value={editedProductInfo.productName}
            onChange={handleChange}
            className="w-full"
          />
        ) : (
          productInfo.productName
        )}
      </h2>
      <p className="text-2xl font-semibold">
        {isEditing ? (
          <input
            type="text"
            name="price"
            value={Number(editedProductInfo.price).toLocaleString()}
            onChange={handleChange}
            className="w-40 mr-2"
          />
        ) : (
          <>
            {Number(productInfo.price).toLocaleString()} vnd
          </>
        )}
      </p>

      <hr />
      <p className="text-base text-gray-600">
        {isEditing ? (
          <textarea
            name="des"
            value={editedProductInfo.des}
            onChange={handleChange}
            className="w-full h-36"
          />
        ) : (
          productInfo.productDesc
        )}
      </p>
      <p className="font-medium">
        {isEditing ? (
          <input
            type="text"
            name="color"
            value={2000}
            onChange={handleChange}
          />
        ) : (
          <span>{productInfo.productStars}/5⭐</span>
        )}
      </p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span>{" "}
        {isEditing ? (
          <input
            type="text"
            name="color"
            value={editedProductInfo.color}
            onChange={handleChange}
          />
        ) : (
          productInfo.color
        )}
      </p>
      <div className="flex gap-6 items-center">
        <p className="font-medium gap-4">
          <span className="font-normal">Quantity:</span>{" "}
          {isAdmin ? null : (
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  updateQuantity(0); // or handle it as per your logic
                } else {
                  updateQuantity(parseInt(value));
                }
              }}
              className="w-20 h-10 text-center border-[1px] border-gray-400 rounded-md"
              min={0}
            />
          )}
        </p>
        <p className="font-normal italic text-gray-500 text-lg">
          {isEditing ? (
            <input
              type="text"
              name="color"
              value={2000}
              onChange={handleChange}
            />
          ) : (
            productInfo.productCount
          )}
          <span className="font-normal text-gray-500"> products available</span>{" "}
        </p></div>
      {isAdmin ? (
        isEditing ? (
          <button
            className="w-1/4 px-4 py-2 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <div className="flex justify-between">
            <button
              className="w-1/4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 duration-300 text-white text-lg font-titleFont"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="w-1/4 px-4 py-2 bg-red-500 hover:bg-red-600 duration-300 text-white text-lg font-titleFont"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        )
      ) : (
        <button
          onClick={() => {
            const productToAdd = {
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: quantity,
              image: productInfo.productImages,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
              count: productInfo.productCount,
            };
            if (quantity > 0) {
              dispatch(addToCart(productToAdd));
              notify();
            } else {
              toast.error('Please select a quantity before adding to cart.');
            }
          }}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
        >
          Add to Cart
        </button>
      )}
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories: </span>
        {isEditing ? (
          <input
            type="text"
            name="categories"
            value={editedProductInfo.categories}
            onChange={handleChange}
            className="mr-2 w-full"
          />
        ) : (
          <>
            {productInfo.productCategory}
          </>
        )}
      </p>

    </div>
  );
};

export default ProductInfo;