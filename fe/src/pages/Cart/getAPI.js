import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

const CartList = () => {
  const [items, setItems] = useState([]); // State để lưu trữ danh sách sản phẩm

  useEffect(() => {
    // Gọi API khi component được mount
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cart/userList/?customerid=1', {
          params: { customerid: '1' }
        });
        setItems(response.data); // Cập nhật state với dữ liệu trả về
      } catch (error) {
        console.error('There was an error fetching the cart items', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} /> // Render từng sản phẩm
      ))}
    </div>
  );
};

export default CartList;
