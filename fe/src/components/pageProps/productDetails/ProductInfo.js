import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";

const ProductInfo = ({ productInfo, onSave, isAdmin, onDelete }) => {
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
          renderDescription()
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
      <p className="font-medium italic">
        <span className="font-normal">Available:</span>{" "}
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
            dispatch(
              addToCart({
                _id: productInfo.id,
                name: productInfo.productName,
                quantity: 1,
                image: productInfo.productImages,
                badge: productInfo.badge,
                price: productInfo.price,
                colors: productInfo.color,
                count: productInfo.productCount,
              })
            );
            notify();
          }}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductInfo;