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

  // product update
  const [productInfoToChange, setProductInfoToChange] = useState(
    {
      "product_id": 100,
      "name": "a",
      "category": "a",
      "price": 100,
      "stars": 4.5,
      "desc": "a",
      "product_count": 1,
      "url": "a"
    }
  );
  const changProductInfo = async () => {
    try {
      console.log(productInfoToChange);
      console.log(productInfoToChange.id);
      console.log(productInfoToChange.name);
      console.log(productInfoToChange.category);
      console.log(productInfoToChange.price);
      console.log(productInfoToChange.stars);
      console.log(productInfoToChange.desc);
      console.log(productInfoToChange.product_count);
      console.log(productInfoToChange.url);
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/product_update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "product_id": productInfoToChange.product_id,
            "name": productInfoToChange.name,
            "category": productInfoToChange.category,
            "price": productInfoToChange.price,
            "stars": productInfoToChange.stars,
            "desc": productInfoToChange.desc,
            "product_count": productInfoToChange.product_count,
            "url": productInfoToChange.url
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Update failed");
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // product delete
  const [productInfoToDelete, setProductInfoToDelete] = useState(
    {
      "product_id": 34
    }
  );
  const deleteProductInfo = async () => {
    try {
      console.log(productInfoToDelete);
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/product_delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "product_id": productInfoToDelete.product_id
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      const data = await res.status();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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
    changProductInfo();
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
    deleteProductInfo();
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