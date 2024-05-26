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

  // product update
  const [productInfoToChange, setProductInfoToChange] = useState({});

  useEffect(() => {
    setProductInfoToChange({
      product_id: productInfo._id,
      name: editedProductInfo.productName,
      category: editedProductInfo.productCategory,
      price: editedProductInfo.price,
      stars: editedProductInfo.productStars,
      desc: editedProductInfo.productDesc,
      product_count: editedProductInfo.productCount,
      url: editedProductInfo.productImages,
    });
    console.log("iddddddd", editedProductInfo._id);
  }, [editedProductInfo]);

  console.log(editedProductInfo.id);
  const changProductInfo = async () => {
    try {
      console.log("id",productInfoToChange);
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
      <h2 className="text-4xl">
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
            {Number(productInfo.price).toLocaleString()} đ
          </>
        )}
      </p>

      <hr />
      <p className="text-base text-gray-600">
        {isEditing ? (
          <textarea
            name="productDesc"
            value={editedProductInfo.productDesc}
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
            name="productStars"
            value={editedProductInfo.productStars}
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
      <div className="flex items-center">
        <p className="font-medium gap-4">
          {isAdmin ? null : (
            <div>
              <span className="font-normal">Quantity: </span>
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
                className="w-20 mr-8 h-10 text-center border-[1px] border-gray-400 rounded-md"
                min={0}
              />
            </div>
          )}
        </p>
        <p className="font-normal italic text-gray-500 text-lg">
          {isEditing ? (
            <input
              type="text"
              name="productCount"
              value={editedProductInfo.productCount}
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
            name="productCategory"
            value={editedProductInfo.productCategory}
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