import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCartItems } from './orebiSlice'; // Đảm bảo rằng bạn nhập đúng action

const ListCartComponent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.orebi.products);

  useEffect(() => {
    axios.get('http://localhost:8000/cart/userList/?customerid=1')
      .then(res => {
        dispatch(setCartItems(res.data)); // Sử dụng dispatch để cập nhật state
      })
      .catch(err => {
        console.error("There was an error making the request:", err);
      });
  }, [dispatch]);

  return (
    <div>
      {cartItems.map((output, id) => (
        <div key={id}>
          productid = {output.productid}
          quantity = {output.quantity}
        </div>
      ))}
    </div>
  );
};

export default ListCartComponent;
